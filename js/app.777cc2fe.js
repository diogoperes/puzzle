!function(e){function t(t){for(var o,c,a=t[0],l=t[1],s=t[2],u=0,m=[];u<a.length;u++)c=a[u],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&m.push(i[c][0]),i[c]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(d&&d(t);m.length;)m.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,a=1;a<n.length;a++){var l=n[a];0!==i[l]&&(o=!1)}o&&(r.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},i={0:0},r=[];function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var s=0;s<a.length;s++)t(a[s]);var d=l;r.push([83,1]),n()}({81:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var o;n(31),n(39),n(41),n(43),n(44),n(45),n(48),n(51),n(53),n(54),n(56),n(80),n(81),n(82);function i(e,t,n,o,i,s){var d={};switch(!0){case 0===t&&0===e:d={type:"supEsquerra",a:{draw:" l 100,0 "},b:r(n),c:c(n),d:{draw:" l 0,-100"}};break;case 0===e&&t===i-1:d={type:"supDreta",a:{draw:" l 100,0 "},b:{draw:" l 0,100 "},c:c(n),d:a(n,s)};break;case e==o-1&&0==t:d={type:"infEsquerra",a:l(n,s,i),b:r(n),c:{draw:" l -100,0 "},d:{draw:" l 0,-100 "}};break;case e===o-1&&t===i-1:d={type:"infDreta",a:l(n,s,i),b:{draw:" l 0,100 "},c:{draw:" l -100,0 "},d:a(n,s)};break;case 0===e:d={type:"superior",a:{draw:" l 100,0 "},b:r(n),c:c(n),d:a(n,s)};break;case 0===t:d={type:"esquerra",a:l(n,s,i),b:r(n),c:c(n),d:{draw:" l 0,-100 "}};break;case t===i-1:d={type:"dreta",a:l(n,s,i),b:{draw:" l 0,100 "},c:c(n),d:a(n,s)};break;case e===o-1:d={type:"inferior",a:l(n,s,i),b:r(n),c:{draw:" l -100,0 "},d:a(n,s)};break;default:d={type:"central",a:l(n,s,i),b:r(n),c:c(n),d:a(n,s)}}return d.col=t,d.row=e,d.index=n,d.path=function(){return this.a.draw+this.b.draw+this.c.draw+this.d.draw+"z"},d}function r(e){var t=[{draw:"q -4,20 -5,43 a11,15 1,1,0 0,14 q1,20 5,43",inverse:"q -4,-20  -5,-43 a11,15 1,1,1 0,-14 q 1-20 5,-43"},{draw:"q -4,20 -5,43 a11,15 1,1,1 0,14 q1,20 5,43",inverse:"q -4,-20 -5,-43 a11,15 1,1,0 0,-14 q 1-20 5,-43"},{draw:"q 4,20 5,43 a11,15 1,1,0 0,14 q -1,20 -5,43",inverse:"q 4,-20  5,-43 a11,15 1,1,1 0,-14 q -1-20 -5,-43"},{draw:"q 4,20 5,43 a11,15 1,1,1 0,14 q -1,20 -5,43",inverse:"q 4,-20 5,-43 a11,15 1,1,0 0,-14 q -1-20 -5,-43"}];return t[Math.floor(Math.random()*t.length)]}function c(e){var t=[{draw:"q -20,-4 -43,-5 a15,11 1,1,0 -14,0 q-20,1 -43,5",inverse:"q 20,-4 43,-5 a15,11 1,1,1 14,0 q20,1 43,5 "},{draw:"q -20,-4 -43,-5 a15,11 1,1,1 -14,0 q-20,1 -43,5",inverse:"q 20,-4 43,-5 a15,11 1,1,0 14,0 q20,1 43,5 "},{draw:"q -20,4 -43,5 a15,11 1,1,0 -14,0 q-20,-1 -43,-5",inverse:"q 20,4 43,5 a15,11 1,1,1 14,0 q20,-1 43,-5 "},{draw:"q -20,4 -43,5 a15,11 1,1,1 -14,0 q-20,-1 -43,-5",inverse:"q 20,4 43,5 a15,11 1,1,0 14,0 q20,-1 43,-5 "}];return t[Math.floor(Math.random()*t.length)]}function a(e,t){return{draw:t[e-1].b.inverse}}function l(e,t,n){return{draw:t[e-n].c.inverse}}function s(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function d(e,t,n,i,r){if(o=n,e.y>0){var c=t[e.y-1][e.x];if(u(e,c)){var a=m(e,c,5);if(a&&h(e,c))return console.log("connect with piece in top: ",a),g(e,c),!0}}if(e.y<i-1){var l=t[e.y+1][e.x];if(u(e,l)){var s=m(l,e,5);if(s&&h(e,l))return console.log("connect with piece in bottom: ",s),g(e,l),!0}}if(e.x>0){var d=t[e.y][e.x-1];if(u(e,d)){var p=f(d,e,5);if(p&&h(e,d))return console.log("connect with piece in left: ",p),g(e,d),!0}}if(e.x<r-1){var y=t[e.y][e.x+1];if(u(e,y)){var v=f(e,y,5);if(v&&h(e,y))return console.log("connect with piece in right: ",v),g(e,y),!0}}return!1}function u(e,t){return e.angle===t.angle}function m(e,t,n){var o=E(e),i=o.top-n,r=o.top+n,c=o.left+parseInt(e.clientWidth/2)+n,a=o.left+parseInt(e.clientWidth/2)-n,l=E(t),s=l.top+t.clientHeight-n,d=l.top+t.clientHeight+n,u=l.left+parseInt(t.clientWidth/2)+n;return p(a,i,c,r,l.left+parseInt(t.clientWidth/2)-n,s,u,d)}function f(e,t,n){var o=E(e),i=o.top+parseInt(e.clientHeight/2)-n,r=o.top+parseInt(e.clientHeight/2)+n,c=o.left+e.clientWidth+n,a=o.left+e.clientWidth-n,l=E(t),s=l.top+parseInt(t.clientHeight/2)-n,d=l.top+parseInt(t.clientHeight/2)+n,u=l.left+n;return p(a,i,c,r,l.left-n,s,u,d)}function p(e,t,n,o,i,r,c,a){return n>=i&&e<=c&&t<=a&&o>=r}function h(e,t){return!e.contains(t)&&!t.contains(e)&&("move"!==e.parentElement.className||e.parentElement!==t.parentElement)}function g(e,t){s(t.childNodes).find((function(e){return"move"===e.className}))?(console.log("is a parent, children will be moved to piece to connect. Children: ",t.childNodes),y(e,t),v(e,t)):"move"===t.parentElement.className?(console.log("is child, connect parent"),t=t.parentElement,"move"===e.parentElement.className&&(e=e.parentElement),y(e,t),v(e,t)):v(e,t)}function y(e,t){var n=[];t.childNodes.forEach((function(e){"move"===e.className&&n.push(e)})),n.forEach((function(t){v(e,t)}))}function v(e,t){var n=(t.y-e.y)*o,i=(t.x-e.x)*o;t.parentElement.removeChild(t),e.appendChild(t),t.style.top=n+"px",t.style.left=i+"px"}function E(e){var t=e.getBoundingClientRect(),n=document.body,o=document.documentElement,i=window.pageYOffset||o.scrollTop||n.scrollTop,r=window.pageXOffset||o.scrollLeft||n.scrollLeft,c=o.clientTop||n.clientTop||0,a=o.clientLeft||n.clientLeft||0,l=t.top+i-c,s=t.left+r-a;return{top:Math.round(l),left:Math.round(s)}}function w(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var I,b,x,B,q,L,N,k,T=1,M="http://picsum.photos",C=3,O=3,z=0,P=100,S=!1,j={},A=0,H=[],D=[],R=!1,W=document.getElementById("seeImage");function Y(e,t,n,o){e="M40,40 "+e;var i=document.createElement("canvas");i.width=180,i.height=180;var r=i.getContext("2d"),c=new Path2D(e);r.save(),r.clip(c);var a="".concat(M,"/id/").concat(I,"/").concat(100*O,"/").concat(100*C),l=new Image;/^([\w]+\:)?\/\//.test(a)&&-1===a.indexOf(location.host)&&(l.crossOrigin="anonymous"),l.src=a,l.onload=function(){r.drawImage(l,-100*t+40,-100*n+40);var o=i.toDataURL(),c=new Image;c.src=o,c.className="puzzle-piece-image",c.style.width=180*P/NaN,c.style.height=180*P/100+"px",j[t+"-"+n]={image:c,path:e},++A===C*O&&function(){window.puzzleImagesList=j,H=[],D=[];for(var e=0,t=0;t<C;t++){for(var n=[],o=0;o<O;o++){var i=j[o+"-"+t].image,r=document.createElement("DIV");r.innerHTML='<svg viewbox="0 0 180 180" width="'.concat(180*P/100,'" height="').concat(180*P/100,'"> \n        <path d="').concat(j[o+"-"+t].path,'"></path>\n      </svg>'),r.appendChild(i),r.className="move",r.style.width=P+"px",r.style.height=P+"px",r.onmousedown=ee,r.onclick=te,r.ontouchstart=ee,r.angle=0,r.occupy=!1,r.position=function(){return{left:this.offsetLeft+P/2,top:this.offsetTop+P/2}},r.onmouseup=Q,r.ontouchend=Q,r.index=e;var c=document.createElement("DIV");c.className="position",c.style.width=P+"px",c.style.height=P+"px",c.index=e,c.occupied=!1,document.querySelector("#container").appendChild(c),c.appendChild(r),D.push(c),r.style.zIndex=T++,r.zIndexPrevi=r.style.zIndex,r.x=o,r.y=t,n.push(r),e++}H.push(n)}document.getElementById("loading").style.display="none",document.getElementById("start").style.display="inline-block"}()}}function X(){return fetch("https://picsum.photos/v2/list?page=".concat(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return Math.round(Math.random()*e)}(10),"&limit=100")).then((function(e){return e.json()})).then((function(e){for(var t=ne(0,e.length-32),n=function(n){var o=e[t].id;t++,0===n&&(I=o);var i=new Image;i.src="".concat(M,"/id/").concat(o,"/200/200"),i.alt="imageNumber"+n,i.addEventListener("click",(function(){return function(e){document.querySelector("#start").style.height="",W.style.height="0",document.getElementById("arrangePieces").style.height="0",document.querySelector("#menu").classList.remove("active"),document.querySelector("#menuButton").classList.remove("active"),I=e,F()}(o)})),document.getElementById("models").appendChild(i)},o=0;o<32;o++)n(o);F()}))}function F(){B=0;for(var e=document.getElementById("container").getElementsByClassName("position")[0];e;)document.getElementById("container").removeChild(e),e=document.getElementById("container").getElementsByClassName("position")[0];for(var t=document.getElementsByTagName("body")[0].getElementsByClassName("move")[0];t;)document.getElementsByTagName("body")[0].removeChild(t),t=document.getElementsByTagName("body")[0].getElementsByClassName("move")[0];b=[];var n=0;S=!1,!1,P=100,window.innerWidth<O*P+P&&(P=Math.floor(window.innerWidth/O-1)),window.innerHeight/2.2<C*P&&(P=Math.floor(window.innerHeight/2.2/C)),P<40&&(P=40,alert("Sorry :/ Your device is too small for this puzzle")),document.getElementById("container").style.width=O*P+"px",document.getElementById("container").style.height=C*P+"px",document.getElementById("container").classList.remove("puzzleFinished");var o="".concat(M,"/id/").concat(I,"/").concat(O*P,"/").concat(C*P);document.getElementById("backgroundImage").style.backgroundImage="url(".concat(o,")"),document.getElementById("loading").style.display="block",j={},A=0;for(var r=0;r<C;r++)for(var c=0;c<O;c++){var a=i(r,c,n,C,O,b);b.push(a),Y(a.path(),c,r),n++}}function _(){document.getElementById("container").classList.add("puzzleFinished"),document.getElementById("time").innerHTML=L,document.getElementById("time").style.opacity="1",W.style.height="0",document.getElementById("arrangePieces").style.height="0",document.getElementById("backgroundImage").classList.remove("checked"),W.classList.remove("checked")}function J(){document.querySelector("#start").style.height=0,document.getElementById("arrangePieces").style.height="",W.style.height="",document.querySelectorAll(".move").forEach((function(e,t){var n=U();e.style.top=n.top,e.style.left=n.left,e.parentNode.removeChild(e),document.body.appendChild(e),R=document.getElementById("switch").checked,setTimeout((function(){var t=R?Math.floor(4*Math.random()):0;e.rotation=90*t,e.angle=t,e.style.transform="rotate("+e.rotation+"deg)"}),10)})),q=(new Date).getTime(),document.getElementById("time").innerHTML=""}function V(){document.querySelectorAll("body > .move").forEach((function(e,t){var n=U();e.classList.add("animate"),void 0!==e.timeout&&clearTimeout(e.timeout),e.timeout=setTimeout((function(){e.classList.remove("animate"),e.timeout=void 0}),500),e.style.top=n.top,e.style.left=n.left}))}function U(){var e=document.getElementById("container").getBoundingClientRect().y+document.getElementById("container").getBoundingClientRect().height,t=document.body.clientHeight-P,n=document.getElementById("container").getBoundingClientRect().x-P,o=document.getElementById("container").getBoundingClientRect().x+document.getElementById("container").getBoundingClientRect().width,i=window.innerWidth-P,r=ne(0,2);return 1===r||document.getElementById("container").getBoundingClientRect().x<P?{top:ne(e,t)+"px",left:ne(0,window.innerWidth-P)+"px"}:0===r?{top:ne(80,window.innerHeight-P)+"px",left:ne(0,n)+"px"}:2===r?{top:ne(80,window.innerHeight-P)+"px",left:ne(o,i)+"px"}:void 0}function G(){this.angle++,this.angle>=4&&(this.angle=0),this.rotation+=90,this.style.transform="rotate("+this.rotation+"deg)",this.occupy===this.index&&this.angle%4==0&&K(this)}function K(e){var t=D[e.index],n=t.offsetLeft+document.getElementById("container").offsetLeft,o=t.offsetTop+document.getElementById("container").offsetTop;if(e.style.top=o+"px",e.style.left=n+"px",t.occupied=!0,e.occupy=e.index,e.parentElement.removeChild(e),t.appendChild(e),e.onmousedown="",e.onclick="",e.onmouseover="",e.onmouseout="",e.onmousemove="",e.ondblclick="",e.onmouseup="",e.style.cursor="default",e.style.position="static",e.style.transition=".1s",setTimeout((function(){e.style.transform="scale(1.05)"}),50),setTimeout((function(){e.style.transform="scale(1)"}),150),++B===C*O){L=Math.floor(((new Date).getTime()-q)/1e3);var i=Math.floor(L/3600),r=Math.floor((L-3600*i)/60),c=L-3600*i-60*(r=r<10?"0"+r:r);L="Time spent: "+ +(i>0?i+":":"")+ +r+":"+(c=c<10?"0"+c:c),document.getElementById("time").style.opacity=0,setTimeout(_,500)}}function Q(){var e=S;e&&"move"===e.parentElement.className&&(e=e.parentElement);var t=function(e){if(e.style){e.style.zIndex=T++,e.zIndexPrevi=e.style.zIndex;var t=D[e.index],n=t.offsetLeft+document.getElementById("container").offsetLeft,o=t.offsetTop+document.getElementById("container").offsetTop;if(e.position().left>n&&e.position().left<n+P&&e.position().top>o&&e.position().top<o+P&&!t.occupied&&t.index===e.index&&e.angle%4==0){if(K(e),w(e.childNodes).find((function(e){return"move"===e.className}))){for(var i=[],r=0;r<e.childNodes.length;r++)"move"===e.childNodes[r].className&&i.push(e.childNodes[r]);i.forEach((function(e){K(e)}))}return!0}return!1}}(e);if(console.log("did it placed",t),!t){var n,o=d(S,H,P,C,O);if(!o)if(S&&"move"===S.parentElement.className?n=S.parentElement:S&&w(S.childNodes).find((function(e){return"move"===e.className}))&&(n=S),n)for(var i=0;i<n.childNodes.length&&("move"!==n.childNodes[i].className||!(o=d(n.childNodes[i],H,P,C,O)));i++);}S=!1}function Z(e){"touchmove"===e.type&&(e.clientX=e.touches[0].clientX,e.clientY=e.touches[0].clientY);var t=S;if(S&&"move"===S.parentElement.className&&(t=t.parentElement),t){var n={x:e.clientX,y:e.clientY};t.style.left=n.x+x[0]+"px",t.style.top=n.y+x[1]+"px",e.preventDefault(),e.stopPropagation()}}function $(e){"position"!==e.target.parentElement.className&&(S=this,x=[this.offsetLeft-e.clientX,this.offsetTop-e.clientY],"move"===e.target.parentElement.className&&(x=[E(e.target.parentElement).left-e.clientX,E(e.target.parentElement).top-e.clientY]),"number"==typeof this.occupy&&(document.querySelectorAll(".position")[this.occupy].occupied=!1,this.occupy=!1))}function ee(e){"touchstart"===e.type&&(e.clientX=e.touches[0].clientX,e.clientY=e.touches[0].clientY);var t=E(this),n=e.clientX-t.left,o=e.clientY-t.top;n>0&&n<P&&o>0&&o<P?($.call(this,e),this.style.zIndex=T+1):this.style.zIndex=this.zIndexPrevi}function te(e){"move"===e.target.parentElement.className||e.target.querySelectorAll(".move").length>0||!R||(void 0===k||k!==e.target?(k=e.target,z=1):z++,1===z?N=setTimeout((function(){z=0}),300):2===z&&(clearTimeout(N),z=0,G.call(this)))}function ne(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function oe(){var e=document.getElementById("backgroundImage");this.classList.contains("checked")?(e.classList.remove("checked"),this.classList.remove("checked")):(e.classList.add("checked"),this.classList.add("checked"))}document.addEventListener("DOMContentLoaded",(function(){X(),document.getElementById("start").onclick=J,document.getElementById("arrangePieces").onclick=V,document.getElementById("arrangePieces").style.height="0",W.onclick=oe,W.style.height="0",document.getElementById("fullscreen").onclick=function(){var e=!!document.fullscreen,t=document.getElementById("fullscreen");e?(document.msExitFullscreen?document.msExitFullscreen():document.exitFullscreen(),t.className="fullscreen"):(document.body.msRequestFullscreen?document.body.msRequestFullscreen():document.body.requestFullscreen(),t.className="fullscreenOff")};for(var e=document.getElementsByName("radioDifficulty"),t=0,n=e.length;t<n;t++)e[t].addEventListener("click",(function(e){C=e.currentTarget.getAttribute("rows"),O=e.currentTarget.getAttribute("cols")}))})),document.addEventListener("fullscreenchange",(function(){var e=!!document.fullscreen,t=document.getElementById("fullscreen");t.className=e?"fullscreenOff":"fullscreen"}),!1),document.addEventListener("mousemove",Z,{passive:!1}),document.addEventListener("touchmove",Z,{passive:!1}),document.getElementById("menuButton").addEventListener("click",(function(e){var t=e.currentTarget,n=document.getElementById("menu");t.classList.contains("active")?(t.classList.remove("active"),n.classList.remove("active")):(t.classList.add("active"),n.classList.add("active")),e.stopPropagation()})),document.getElementById("menu").addEventListener("click",(function(e){e.stopPropagation()})),document.addEventListener("click",(function(){var e=document.getElementById("menu"),t=document.getElementById("menuButton");e.classList.remove("active"),t.classList.remove("active")}))}});
//# sourceMappingURL=app.777cc2fe.js.map