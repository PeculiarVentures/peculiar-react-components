(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{136:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return h}));var r=n(1),o=n.n(r),u=n(6);function c(e){return(c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y(e);if(t){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p(this,n)}}function p(e,t){return!t||"object"!==c(t)&&"function"!==typeof t?s(e):t}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=[{value:"one",label:"Item one"},{value:"two",label:"Item two"},{value:"three",label:"Item three"}],h=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(p,e);var t,n,r,c=f(p);function p(){var e;a(this,p);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return b(s(e=c.call.apply(c,[this].concat(n))),"state",{value:"one"}),e}return t=p,(n=[{key:"render",value:function(){var e=this,t=this.state.value;return o.a.createElement("div",null,o.a.createElement(u.y,{value:t,onChange:function(t,n){return e.setState({value:n})}},v.map((function(e){return o.a.createElement(u.x,{key:e.value,value:e.value,disabled:e.disabled},e.label)}))))}}])&&i(t.prototype,n),r&&i(t,r),p}(r.Component)}}]);
//# sourceMappingURL=sources-demos-tabs-controlled.4280a119.chunk.js.map