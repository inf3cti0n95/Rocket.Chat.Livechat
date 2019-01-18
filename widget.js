!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){var i;
/*!
 * EventEmitter v5.2.5 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */!function(e){"use strict";function o(){}var r=o.prototype,s=e.EventEmitter;function a(t,e){for(var n=t.length;n--;)if(t[n].listener===e)return n;return-1}function c(t){return function(){return this[t].apply(this,arguments)}}r.getListeners=function(t){var e,n,i=this._getEvents();if(t instanceof RegExp)for(n in e={},i)i.hasOwnProperty(n)&&t.test(n)&&(e[n]=i[n]);else e=i[t]||(i[t]=[]);return e},r.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},r.getListenersAsObject=function(t){var e,n=this.getListeners(t);return n instanceof Array&&((e={})[t]=n),e||n},r.addListener=function(t,e){if(!function t(e){return"function"==typeof e||e instanceof RegExp||!(!e||"object"!=typeof e)&&t(e.listener)}(e))throw new TypeError("listener must be a function");var n,i=this.getListenersAsObject(t),o="object"==typeof e;for(n in i)i.hasOwnProperty(n)&&-1===a(i[n],e)&&i[n].push(o?e:{listener:e,once:!1});return this},r.on=c("addListener"),r.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},r.once=c("addOnceListener"),r.defineEvent=function(t){return this.getListeners(t),this},r.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},r.removeListener=function(t,e){var n,i,o=this.getListenersAsObject(t);for(i in o)o.hasOwnProperty(i)&&-1!==(n=a(o[i],e))&&o[i].splice(n,1);return this},r.off=c("removeListener"),r.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},r.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},r.manipulateListeners=function(t,e,n){var i,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(i=n.length;i--;)r.call(this,e,n[i]);else for(i in e)e.hasOwnProperty(i)&&(o=e[i])&&("function"==typeof o?r.call(this,i,o):s.call(this,i,o));return this},r.removeEvent=function(t){var e,n=typeof t,i=this._getEvents();if("string"===n)delete i[t];else if(t instanceof RegExp)for(e in i)i.hasOwnProperty(e)&&t.test(e)&&delete i[e];else delete this._events;return this},r.removeAllListeners=c("removeEvent"),r.emitEvent=function(t,e){var n,i,o,r,s=this.getListenersAsObject(t);for(r in s)if(s.hasOwnProperty(r))for(n=s[r].slice(0),o=0;o<n.length;o++)!0===(i=n[o]).once&&this.removeListener(t,i.listener),i.listener.apply(this,e||[])===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},r.trigger=c("emitEvent"),r.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},r.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},r._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},r._getEvents=function(){return this._events||(this._events={})},o.noConflict=function(){return e.EventEmitter=s,o},void 0===(i=function(){return o}.call(e,n,e,t))||(t.exports=i)}("undefined"!=typeof window?window:this||{})},function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i);window.RocketChat=window.RocketChat||{_:[]};const r={};let s,a,c,d,u=[],l=!1,f=!1;const h="352px",p="382px",m="86px",y=["chat-maximized","chat-minimized","chat-started","chat-ended","pre-chat-form-submit","offline-form-submit"],g=new o.a;function v(t,e){return-1!==y.indexOf(t)&&g.on(t,e)}function w(t,e){void 0!==e?g.emit(t,e):g.emit(t)}function b(t,e){if(!l)return u.push([t,e]);const n={src:"rocketchat",fn:t,args:e};a.contentWindow.postMessage(n,"*")}function x(){"closed"!==s.dataset.state&&(f&&(document.body.style.cssText=c,document.body.scrollTop=d),s.dataset.state="closed",s.style.height=m,s.style.right="50px",s.style.bottom="0px",b("widgetClosed"),w("chat-minimized"))}function O(){"opened"!==s.dataset.state&&(f&&(d=document.body.scrollTop,c=document.body.style.cssText,document.body.style.cssText+=`overflow: hidden; height: 100%; width: 100%; position: fixed; top:${d}px;`),s.dataset.state="opened",s.style.height=p,b("widgetOpened"),document.querySelector(".rocketchat-widget iframe").focus(),w("chat-maximized"))}const L={ready(){l=!0,u.length>0&&(u.forEach(function(t){b.apply(this,t)}),u=[])},toggleWindow(){"closed"===s.dataset.state?O():x()},restoreWindow(){"closed"===s.dataset.state&&O()},startDragWindow(t){"opened"===s.dataset.state&&(this.dragOffset=t)},stopDragWindow(){"opened"===s.dataset.state&&(this.dragOffset=null)},dragWindow(t){if(!this.dragOffset)return;const e=parseInt(s.style.right.replace(/px$/,""),10),n=parseInt(s.style.bottom.replace(/px$/,""),10);s.style.right=`${e-(t.x-this.dragOffset.x)}px`,s.style.bottom=`${n-(t.y-this.dragOffset.y)}px`},openPopout(){x(),window.open(`${r.url}?mode=popout`,"livechat-popout","width=400, height=450, toolbars=no").focus()},openWidget(){O()},removeWidget(){document.getElementsByTagName("body")[0].removeChild(s)},callback(t,e){w(t,e)}};function E(t){b("pageVisited",{change:t,location:JSON.parse(JSON.stringify(document.location)),title:document.title})}const k={href:null,title:null};function R(t){if(!t)return;r.url=t;const e=document.createElement("div");function n(t){t.matches?(f=!0,e.style.left="0",e.style.right="0",e.style.width="100%"):(e.style.left="auto",e.style.right="50px",e.style.width=h)}e.dataset.state="closed",e.className="rocketchat-widget",e.innerHTML=`<div class="rocketchat-container" style="width:100%;height:100%"><iframe id="rocketchat-iframe" src="${t}" style="width:100%;height:100%;border:none;background-color:transparent" allowTransparency="true"></iframe> `+'</div><div class="rocketchat-overlay"></div>',e.style.position="fixed",e.style.width=h,e.style.height=m,e.style.borderTopLeftRadius="5px",e.style.borderTopRightRadius="5px",e.style.bottom="0",e.style.right="50px",e.style.zIndex="12345",document.getElementsByTagName("body")[0].appendChild(e),s=document.querySelector(".rocketchat-widget"),a=document.getElementById("rocketchat-iframe"),window.addEventListener("message",t=>{if("object"==typeof t.data&&void 0!==t.data.src&&"rocketchat"===t.data.src&&void 0!==L[t.data.fn]&&"function"==typeof L[t.data.fn]){const e=[].concat(t.data.args||[]);L[t.data.fn].apply(null,e)}},!1);const i=window.matchMedia("screen and (max-device-width: 480px)");n(i),i.addListener(n),setInterval(()=>{document.location.href!==k.href&&(E("url"),k.href=document.location.href),document.title!==k.title&&(E("title"),k.title=document.title)},800)}void 0!==window.initRocket&&(console.warn("initRocket is now deprecated. Please update the livechat code."),R(window.initRocket[0])),void 0!==window.RocketChat.url&&R(window.RocketChat.url);const C=window.RocketChat._;window.RocketChat=window.RocketChat._.push=function(t){t.call(window.RocketChat.livechat)},window.RocketChat.livechat={pageVisited:E,setCustomField:function(t,e,n){void 0===n&&(n=!0),b("setCustomField",[t,e,n])},setTheme:function(t){b("setTheme",t)},setDepartment:function(t){b("setDepartment",t)},clearDepartment:function(){b("clearDepartment")},setGuestToken:function(t){b("setGuestToken",t)},setGuestName:function(t){b("setGuestName",t)},setGuestEmail:function(t){b("setGuestEmail",t)},registerGuest:function(t){b("registerGuest",t)},onChatMaximized(t){v("chat-maximized",t)},onChatMinimized(t){v("chat-minimized",t)},onChatStarted(t){v("chat-started",t)},onChatEnded(t){v("chat-ended",t)},onPrechatFormSubmit(t){v("pre-chat-form-submit",t)},onOfflineFormSubmit(t){v("offline-form-submit",t)}},C.forEach(t=>{t.call(window.RocketChat.livechat)})}]);