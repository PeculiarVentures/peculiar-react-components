(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{160:function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return v}));var n=r(1),o=r.n(n),i=r(11);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,h(n.key),n)}}function f(t,e){return(f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function l(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=y(t);if(e){var o=y(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){if(e&&("object"===c(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return p(t)}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e,r){return(e=h(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function h(t){var e=function(t,e){if("object"!==c(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!==c(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===c(e)?e:String(e)}var v=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&f(t,e)}(s,t);var e,r,n,c=l(s);function s(){var t;u(this,s);for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return b(p(t=c.call.apply(c,[this].concat(r))),"state",{show:!1}),b(p(t),"handleClick",(function(){t.setState({show:!t.state.show})})),b(p(t),"container",null),t}return e=s,(r=[{key:"render",value:function(){var t=this,e=this.state.show;return o.a.createElement("div",null,o.a.createElement(i.e,{onClick:this.handleClick},e?"UNMOUNT CHILDREN":"MOUNT CHILDREN"),o.a.createElement("div",{style:{marginTop:20}},e&&o.a.createElement(i.p,{container:this.container},o.a.createElement(i.B,{className:"aui_stroke_grey"},"Portal childrens"))),o.a.createElement("div",{ref:function(e){t.container=e}}))}}])&&a(e.prototype,r),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),s}(n.Component)}}]);
//# sourceMappingURL=sources-demos-portal-basic.3e7cd63b.chunk.js.map