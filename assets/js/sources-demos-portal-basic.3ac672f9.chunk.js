(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{108:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return h}));var r=n(0),o=n.n(r),c=n(6);function i(t){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=y(t);if(e){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return s(this,n)}}function s(t,e){return!e||"object"!==i(e)&&"function"!==typeof e?p(t):e}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(s,t);var e,n,r,i=l(s);function s(){var t;u(this,s);for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return b(p(t=i.call.apply(i,[this].concat(n))),"state",{show:!1}),b(p(t),"handleClick",(function(){t.setState({show:!t.state.show})})),b(p(t),"container",null),t}return e=s,(n=[{key:"render",value:function(){var t=this,e=this.state.show;return o.a.createElement("div",null,o.a.createElement(c.e,{onClick:this.handleClick},e?"UNMOUNT CHILDREN":"MOUNT CHILDREN"),o.a.createElement("div",{style:{marginTop:20}},e&&o.a.createElement(c.p,{container:this.container},o.a.createElement(c.B,{className:"aui_stroke_grey"},"Portal childrens"))),o.a.createElement("div",{ref:function(e){t.container=e}}))}}])&&a(e.prototype,n),r&&a(e,r),s}(r.Component)}}]);
//# sourceMappingURL=sources-demos-portal-basic.3ac672f9.chunk.js.map