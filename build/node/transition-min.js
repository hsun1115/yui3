YUI.add("transition",function(D){var E="transition:start",C="transition:end",A="transition:propertyEnd",B=D.Transition;D.mix(B.prototype,{_start:function(){if(B.useNative){this._runNative();}else{this._runTimer();}},_runTimer:function(){var F=this;F._initAttrs();if(F._totalDuration){F._node.fire(E,{type:E,config:F._config});}B._running[D.stamp(F)]=F;F._startTime=new Date();B._startTimer();},_end:function(F){var G=this._duration*1000;if(F){this._runAttrs(G,G);}delete B._running[D.stamp(this)];this._running=false;this._startTime=null;},_runFrame:function(){var G=new Date()-this._startTime,F=(G>=this._totalDuration);this._runAttrs(G);if(F){this._end();}},_runAttrs:function(I){var L=this,P=L._runtimeAttr,H=B.behaviors,J=L._node,M=false,F=false,G,K,O,R,Q,S,N;for(N in P){if(P[N].to){G=P[N];Q=G.duration;O=Q;R=I/1000;S=I;K=(N in H&&"set" in H[N])?H[N].set:B.DEFAULT_SETTER;M=(S>=Q);if(Q===0){Q=S=1;}else{if(S>Q){S=Q;}}if(!L._skip[N]){K(L,N,G.from,G.to,S,Q,G.easing,G.unit);if(M){L._skip[N]=true;L._count--;if(O>0){J.fire(A,{type:A,elapsedTime:R,propertyName:N,config:L._config});if(!F&&L._count<=0){F=true;J.fire(C,{type:C,elapsedTime:R,config:L._config});}}}}}}},_initAttrs:function(){var Q={},R={},N=this._easing,L={},G=B.behaviors,S=this._attrs,K,I,F,P,H,J;for(F in S){if(S.hasOwnProperty(F)){I=S[F];K=this._duration*1000;if(typeof I.value!=="undefined"){K=(("duration" in I)?I.duration:this._duration)*1000;N=I.easing||N;I=I.value;}if(typeof I==="function"){I=I.call(this._node,this._node);}H=(F in G&&"get" in G[F])?G[F].get(this,F):B.DEFAULT_GETTER(this,F);var O=B.RE_UNITS.exec(H);var M=B.RE_UNITS.exec(I);H=O?O[1]:H;J=M?M[1]:I;P=M?M[2]:O?O[2]:"";if(!P&&B.RE_DEFAULT_UNIT.test(F)){P=B.DEFAULT_UNIT;}if(!H||!J){return;}if(typeof N==="string"){if(N.indexOf("cubic-bezier")>-1){N=N.substring(13,N.length-1).split(",");}else{if(B.easings[N]){N=B.easings[N];}}}L[F]={from:H,to:J,unit:P,duration:K,easing:N};if(K>this._totalDuration){this._totalDuration=K;}this._count++;}}this._skip={};this._runtimeAttr=L;},_getOffset:function(G){var K=this._node,I=K._node,M=K.getComputedStyle(G),F,J,H,L;if(M==="auto"){F=K.getStyle("position");if(F==="static"||F==="relative"){M=0;}else{if(I.getBoundingClientRect){J=I.offsetParent;H=J.getBoundingClientRect()[G];L=I.getBoundingClientRect()[G];if(G==="left"||G==="top"){M=L-H;}else{M=H-I.getBoundingClientRect()[G];}}}}return M;},destroy:function(){this.detachAll();this._node=null;}},true);D.mix(D.Transition,{RE_DEFAULT_UNIT:/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,DEFAULT_UNIT:"px",intervalTime:20,behaviors:{left:{get:function(G,F){return G._getOffset(F);}}},DEFAULT_SETTER:function(I,J,L,M,O,H,K,N){L=Number(L);M=Number(M);var G=I._node,F=B.cubicBezier(K,O/H);F=L+F[0]*(M-L);if(J in G._node.style||J in D.DOM.CUSTOM_STYLES){N=N||"";G.setStyle(J,F+N);}else{if(G._node.attributes[J]){G.setAttribute(J,F);}else{G.set(J,F);}}},DEFAULT_GETTER:function(H,F){var G=H._node,I="";if(F in G._node.style||F in D.DOM.CUSTOM_STYLES){I=G.getComputedStyle(F);}else{if(G._node.attributes[F]){I=G.getAttribute(F);}else{I=G.get(F);}}return I;},_startTimer:function(){if(!B._timer){B._timer=setInterval(B._runFrame,B.intervalTime);}},_stopTimer:function(){clearInterval(B._timer);B._timer=null;},_runFrame:function(){var F=true,G;for(G in B._running){if(B._running[G]._runFrame){F=false;B._running[G]._runFrame();}}if(F){B._stopTimer();}},cubicBezier:function(X,S){var b=0,L=0,a=X[0],K=X[1],Z=X[2],J=X[3],Y=1,I=0,W=Y-3*Z+3*a-b,V=3*Z-6*a+3*b,U=3*a-3*b,T=b,R=I-3*J+3*K-L,Q=3*J-6*K+3*L,P=3*K-3*L,O=L,N=(((W*S)+V)*S+U)*S+T,M=(((R*S)+Q)*S+P)*S+O;return[N,M];},easings:{ease:[0.25,0,1,0.25],linear:[0,0,1,1],"ease-in":[0.42,0,1,1],"ease-out":[0,0,0.58,1],"ease-in-out":[0.42,0,0.58,1]},_running:{},_timer:null,RE_UNITS:/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/},true);B.behaviors.top=B.behaviors.bottom=B.behaviors.right=B.behaviors.left;D.Transition=B;},"@VERSION@",{requires:["transition-native","node-style"]});