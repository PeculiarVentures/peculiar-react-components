(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{175:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return h}));var o=n(1),r=n.n(o),c=n(10);function u(e){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=y(e);if(t){var r=y(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return p(this,n)}}function p(e,t){return!t||"object"!==u(t)&&"function"!==typeof t?s(e):t}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(p,e);var t,n,o,u=f(p);function p(){var e;i(this,p);for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return b(s(e=u.call.apply(u,[this].concat(n))),"state",{open:!1}),b(s(e),"handleOpen",(function(){e.setState({open:!0})})),b(s(e),"handleClose",(function(){e.setState({open:!1})})),e}return t=p,(n=[{key:"render",value:function(){var e=this.state.open;return r.a.createElement("div",null,r.a.createElement(c.e,{onClick:this.handleOpen},"Open"),r.a.createElement(c.v,{color:"primary",textColor:"black",autoHideDuration:4e3,onClose:this.handleClose,open:e,action:[r.a.createElement(c.e,{size:"small",key:"0",onClick:this.handleClose,bgType:"stroke",color:"white",textColor:"white"},"Close")]},"I love candy. I love cookies. I love cupcakes."))}}])&&a(t.prototype,n),o&&a(t,o),p}(o.Component)}}]);
//# sourceMappingURL=sources-demos-snackbar-customized.c86ad8d9.chunk.js.map