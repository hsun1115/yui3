YUI.add("selector-css2",function(C){var J="parentNode",I="tagName",E="attributes",F="combinator",D="pseudos",G="previous",H="previousSibling",B=[],A=C.Selector,K={SORT_RESULTS:true,_children:function(N){var L=N.children,M,O;if(!L&&N[I]){L=[];for(M=0,O;O=N.childNodes[M++];){if(O.tagName){L[L.length]=O;}}B[B.length]=N;N.children=L;}return L||[];},_regexCache:{},_re:{attr:/(\[.*\])/g,urls:/^(?:href|src)/},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[className~=$1]"},operators:{"":function(M,L){return C.DOM.getAttribute(M,L[0])!=="";},"~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(L){return C.Selector._children(L[J])[0]===L;}},query:function(L,M,O){var N=[],P=(A._supportsNative()&&A.useNative)?A._nativeQuery:A._query;if(L){N=P(L,M,O);}A._cleanup();return(O)?(N[0]||null):N;},_cleanup:function(){for(var L=0,M;M=B[L++];){delete M.children;}B=[];},_query:function(R,X,Y,P){var U=[],O=R.split(","),L=[],W,Q,M,V,N,S,T;if(O.length>1){for(S=0,T=O.length;S<T;++S){U=U.concat(arguments.callee(O[S],X,Y,true));}U=A.SORT_RESULTS?A._sort(U):U;A._clearFoundCache();}else{X=X||C.config.doc;if(X.nodeType!==9){if(!X.id){X.id=C.guid();}if(X.ownerDocument.getElementById(X.id)){R="#"+X.id+" "+R;X=X.ownerDocument;}}W=A._tokenize(R,X);Q=W[W.length-1];if(Q){if(P){Q.deDupe=true;}if(W[0]&&X.nodeType===9&&(M=W[0].attributes.id)&&X.getElementById(M.value)){X=X.getElementById(M.value);}M=Q.id;V=Q.className;N=Q.tagName;if(M&&C.config.doc.getElementById(M)){L=[C.config.doc.getElementById(M)];}else{if(V&&X.getElementsByClassName){L=X.getElementsByClassName(V);}else{if(N){L=X.getElementsByTagName(N||"*");}}}if(L.length){U=A._filterNodes(L,W,Y);}}}return U;},_filterNodes:function(L,Y,Z){var U=0,T,O,W=Y.length,b=[],V="=",R=L[0],Q=R,N,M,S,a,P,X;do{O=W-1;a=null;while(Q&&Q.tagName){P=false;S=Y[O];T=S.tests.length;while((X=S.tests[--T])){N=X[1];if(Q[X[0]]!==X[2]){Q=Q[a];P=true;break;}}if(P){continue;}if((M=S.combinator)){a=M.axis;Q=Q[a];O--;if(M.direct){a=null;}continue;}else{b[b.length]=R;if(Z){return b;}break;}}}while(Q=R=L[++U]);return b;},_getRegExp:function(N,L){var M=A._regexCache;L=L||"";if(!M[N+L]){M[N+L]=new RegExp(N,L);}return M[N+L];},combinators:{" ":{axis:"parentNode"},">":{axis:"parentNode",direct:true},"+":{axis:"previousSibling",direct:true}},_parsers:[{name:E,re:/^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,fn:function(M,N){var L=M[2];if(M[1]==="id"||(M[1]==="className"&&document.getElementsByClassName&&(L==="~="||L==="="))){N.prefilter=M[1];N[M[1]]=M[3];}if(C.Selector.operators[L]){M[2]=C.Selector._getRegExp(C.Selector.operators[L].replace("{val}",M[3]));}if(!N.last||N.prefilter!==M[1]){return M.slice(1);}}},{name:I,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(M,N){var L=M[1].toUpperCase();N.tagName=L;if(!N.last||N.prefilter){return[I,"=",L];}if(!N.prefilter){N.prefilter="tagName";}}},{name:F,re:/^\s*([>+~]|\s)\s*/,fn:function(L,M){}},{name:D,re:/^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,fn:function(L,M){M.pseudos[L[1]]=A[D][L[1]];}}],_getToken:function(L){return{tagName:null,id:null,className:null,attributes:{},pseudos:{},combinator:null,tests:[]};},_tokenize:function(N){N=N||"";N=A._replaceShorthand(C.Lang.trim(N));var M=A._getToken(),S=N,R=[],T=false,P,Q,O,L;outer:do{T=false;for(O=0,L;L=A._parsers[O++];){if((P=L.re.exec(N))){if(L!==F){M.selector=P[0];}N=N.replace(P[0],"");if(!N.length){M.last=true;}Q=L.fn(P,M);if(Q){M.tests.push(Q);}if(!N.length||L.name===F){R.push(M);M=A._getToken(M);if(L.name===F){M.combinator=C.Selector.combinators[P[1]];}}T=true;}}}while(T&&N.length);if(!T||N.length){R=[];}return R;},_replaceShorthand:function(M){var N=A.shorthand,O=M.match(A._re.attr),Q,P,L;if(O){M=M.replace(A._re.attr,"REPLACED_ATTRIBUTE");}for(Q in N){if(N.hasOwnProperty(Q)){M=M.replace(A._getRegExp(Q,"gi"),N[Q]);}}if(O){for(P=0,L=O.length;P<L;++P){M=M.replace("REPLACED_ATTRIBUTE",O[P]);}}return M;}};C.mix(C.Selector,K,true);},"@VERSION@",{requires:["selector-native"],skinnable:false});