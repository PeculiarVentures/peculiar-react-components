(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{104:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return b}));var r=n(0),o=n.n(r),c=n(6);function u(e){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y(e);if(t){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return s(this,n)}}function s(e,t){return!t||"object"!==u(t)&&"function"!==typeof t?h(e):t}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(s,e);var t,n,r,u=l(s);function s(){var e;a(this,s);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return p(h(e=u.call.apply(u,[this].concat(n))),"state",{mercury:!1,venus:!1,earth:!0}),p(h(e),"handleChange",(function(t){return function(n,r){e.setState(p({},t,r))}})),e}return t=s,(n=[{key:"render",value:function(){var e=this.state,t=e.mercury,n=e.venus,r=e.earth;return o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(c.Checkbox,{style:{marginRight:10},name:"mercury",checked:t,onCheck:this.handleChange("mercury")}),o.a.createElement(c.Checkbox,{style:{marginRight:10},name:"venus",checked:n,onCheck:this.handleChange("venus")}),o.a.createElement(c.Checkbox,{name:"earth",checked:r,onCheck:this.handleChange("earth")}))}}])&&i(t.prototype,n),r&&i(t,r),s}(r.Component)}}]);
//# sourceMappingURL=sources-demos-checkbox-controlled.35f22e6a.chunk.js.map