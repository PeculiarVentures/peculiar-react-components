"use strict";var precacheConfig=[["404.html","75726b515c0b87acc5b5e585ca37c8e0"],["assets/css/default.css","231d3f9be66ad326f30d1cd5cfa58cee"],["favicons/android-chrome-144x144.png","0ac6f735fcbc7358dd9db3c7bb7ff8a9"],["favicons/android-chrome-192x192.png","54024d4dcfa9d6ca4751e10891391505"],["favicons/android-chrome-256x256.png","002eca26a89a2d2f2b87de739a09860b"],["favicons/android-chrome-36x36.png","91defc21ebfb3ec7f5b0affac614be74"],["favicons/android-chrome-384x384.png","2b825a2570d6f7fa07af5c0dfa24e605"],["favicons/android-chrome-48x48.png","def859a442b2a0ed4437dc5d1304779b"],["favicons/android-chrome-512x512.png","c58510c326ec862b5373acf91e69e708"],["favicons/android-chrome-72x72.png","db0fb922b4071e2743b9e06b7b56407a"],["favicons/android-chrome-96x96.png","5f544cec61ac2d1242215e67af8c84d5"],["favicons/apple-touch-icon-114x114.png","aa04f819c35e7ca01e68ad4e8bc64daa"],["favicons/apple-touch-icon-120x120.png","8ab60710dfae00be51ddb26bc2057074"],["favicons/apple-touch-icon-144x144.png","698c907e338869b6e491c9d80f5299fd"],["favicons/apple-touch-icon-152x152.png","f947c5725d685a122454bb4dde2f3fc0"],["favicons/apple-touch-icon-167x167.png","a2e401f5b9205f9453657a7673174001"],["favicons/apple-touch-icon-180x180.png","74491769641aac7165d622cc8d030031"],["favicons/apple-touch-icon-57x57.png","724191f70c626081379a566050840ef5"],["favicons/apple-touch-icon-60x60.png","6d3fefd87b2c0bb24e51f86ea905f977"],["favicons/apple-touch-icon-72x72.png","8fd9c41c91c36783e13cefb792487d50"],["favicons/apple-touch-icon-76x76.png","0238a26b306f8a60e012e461739ba053"],["favicons/apple-touch-icon-precomposed.png","74491769641aac7165d622cc8d030031"],["favicons/apple-touch-icon.png","74491769641aac7165d622cc8d030031"],["favicons/favicon-16x16.png","b534ff9b2b36ce115d0490c89f33f07d"],["favicons/favicon-32x32.png","57d9ae70a8509c7fed8ab1e623df1b93"],["favicons/favicon.ico","522a7b586d04a98e357f2a2b54e4808d"],["favicons/manifest.json","c826f4a8ea81262ee3c665baf7e03177"],["index.html","75726b515c0b87acc5b5e585ca37c8e0"],["index_bbc1e45c3221f303cdde7c798020570298d04387.js","c60fc9536e327385d4ef249542ea1aad"]],cacheName="sw-precache-v3-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,t,r){var o=new URL(e);return r&&o.pathname.match(r)||(o.search+=(o.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),o.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],r=new URL(n,self.location),o=createCacheKey(r,hashParamName,t,/\.\w{8}\./);return[r.toString(),o]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var r=new Request(t,{credentials:"same-origin"});return fetch(r).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),n=urlsToCacheKeys.has(t));!n&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(t=new URL("/react-components/index.html",self.location).toString(),n=urlsToCacheKeys.has(t)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(n,t,r){function o(a,i){if(!t[a]){if(!n[a]){var s="function"==typeof require&&require;if(!i&&s)return s(a,!0);if(c)return c(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var f=t[a]={exports:{}};n[a][0].call(f.exports,function(e){var t=n[a][1][e];return o(t||e)},f,f.exports,e,n,t,r)}return t[a].exports}for(var c="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,n,t){function r(e,n){((n=n||{}).debug||s.debug)&&console.log("[sw-toolbox] "+e)}function o(e){var n;return e&&e.cache&&(n=e.cache.name),n=n||s.cache.name,caches.open(n)}function c(e,n,t){var o=e.url,c=t.maxAgeSeconds,a=t.maxEntries,i=t.name,s=Date.now();return r("Updating LRU order for "+o+". Max entries is "+a+", max age is "+c),u.getDb(i).then(function(e){return u.setTimestampForUrl(e,o,s)}).then(function(e){return u.expireEntries(e,a,c,s)}).then(function(e){r("Successfully updated IDB.");var t=e.map(function(e){return n.delete(e)});return Promise.all(t).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e){var n=Array.isArray(e);if(n&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(n=!1)}),!n)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var i,s=e("./options"),u=e("./idb-cache-expiration");n.exports={debug:r,fetchAndCache:function(e,n){var t=(n=n||{}).successResponses||s.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&t.test(r.status)&&o(n).then(function(t){t.put(e,r).then(function(){var r=n.cache||s.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&function(e,n,t){var r=c.bind(null,e,n,t);i=i?i.then(r):r()}(e,t,r)})}),r.clone()})},openCache:o,renameCache:function(e,n,t){return r("Renaming cache: ["+e+"] to ["+n+"]",t),caches.delete(n).then(function(){return Promise.all([caches.open(e),caches.open(n)]).then(function(n){var t=n[0],r=n[1];return t.keys().then(function(e){return Promise.all(e.map(function(e){return t.match(e).then(function(n){return r.put(e,n)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,n){return o(n).then(function(n){return n.add(e)})},uncache:function(e,n){return o(n).then(function(n){return n.delete(e)})},precache:function(e){e instanceof Promise||a(e),s.preCacheItems=s.preCacheItems.concat(e)},validatePrecacheInput:a,isResponseFresh:function(e,n,t){if(!e)return!1;if(n){var r=e.headers.get("date");if(r&&new Date(r).getTime()+1e3*n<t)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,n,t){var r="sw-toolbox-",o=1,c="store",a="url",i="timestamp",s={};n.exports={getDb:function(e){return e in s||(s[e]=function(e){return new Promise(function(n,t){var s=indexedDB.open(r+e,o);s.onupgradeneeded=function(){s.result.createObjectStore(c,{keyPath:a}).createIndex(i,i,{unique:!1})},s.onsuccess=function(){n(s.result)},s.onerror=function(){t(s.error)}})}(e)),s[e]},setTimestampForUrl:function(e,n,t){return new Promise(function(r,o){var a=e.transaction(c,"readwrite");a.objectStore(c).put({url:n,timestamp:t}),a.oncomplete=function(){r(e)},a.onabort=function(){o(a.error)}})},expireEntries:function(e,n,t,r){return function(e,n,t){return n?new Promise(function(r,o){var s=1e3*n,u=[],f=e.transaction(c,"readwrite"),h=f.objectStore(c);h.index(i).openCursor().onsuccess=function(e){var n=e.target.result;if(n&&t-s>n.value[i]){var r=n.value[a];u.push(r),h.delete(r),n.continue()}},f.oncomplete=function(){r(u)},f.onabort=o}):Promise.resolve([])}(e,t,r).then(function(t){return function(e,n){return n?new Promise(function(t,r){var o=[],s=e.transaction(c,"readwrite"),u=s.objectStore(c),f=u.index(i),h=f.count();f.count().onsuccess=function(){var e=h.result;e>n&&(f.openCursor().onsuccess=function(t){var r=t.target.result;if(r){var c=r.value[a];o.push(c),u.delete(c),e-o.length>n&&r.continue()}})},s.oncomplete=function(){t(o)},s.onabort=r}):Promise.resolve([])}(e,n).then(function(e){return t.concat(e)})})}}},{}],3:[function(e,n,t){function r(e){return e.reduce(function(e,n){return e.concat(n)},[])}e("serviceworker-cache-polyfill");var o=e("./helpers"),c=e("./router"),a=e("./options");n.exports={fetchListener:function(e){var n=c.match(e.request);n?e.respondWith(n(e.request)):c.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(c.default(e.request))},activateListener:function(e){o.debug("activate event fired");var n=a.cache.name+"$$$inactive$$$";e.waitUntil(o.renameCache(n,a.cache.name))},installListener:function(e){var n=a.cache.name+"$$$inactive$$$";o.debug("install event fired"),o.debug("creating cache ["+n+"]"),e.waitUntil(o.openCache({cache:{name:n}}).then(function(e){return Promise.all(a.preCacheItems).then(r).then(o.validatePrecacheInput).then(function(n){return o.debug("preCache list: "+(n.join(", ")||"(none)")),e.addAll(n)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,n,t){var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,n.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,n,t){var r=new URL("./",self.location).pathname,o=e("path-to-regexp"),c=function(e,n,t,c){n instanceof RegExp?this.fullUrlRegExp=n:(0!==n.indexOf("/")&&(n=r+n),this.keys=[],this.regexp=o(n,this.keys)),this.method=e,this.options=c,this.handler=t};c.prototype.makeHandler=function(e){var n;if(this.regexp){var t=this.regexp.exec(e);n={},this.keys.forEach(function(e,r){n[e.name]=t[r+1]})}return function(e){return this.handler(e,n,this.options)}.bind(this)},n.exports=c},{"path-to-regexp":15}],6:[function(e,n,t){var r=e("./route"),o=e("./helpers"),c=function(e,n){for(var t=e.entries(),r=t.next(),o=[];!r.done;){new RegExp(r.value[0]).test(n)&&o.push(r.value[1]),r=t.next()}return o},a=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){a.prototype[e]=function(n,t,r){return this.add(e,n,t,r)}}),a.prototype.add=function(e,n,t,c){var a;c=c||{},n instanceof RegExp?a=RegExp:a=(a=c.origin||self.location.origin)instanceof RegExp?a.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(a),e=e.toLowerCase();var i=new r(e,n,t,c);this.routes.has(a)||this.routes.set(a,new Map);var s=this.routes.get(a);s.has(e)||s.set(e,new Map);var u=s.get(e),f=i.regexp||i.fullUrlRegExp;u.has(f.source)&&o.debug('"'+n+'" resolves to same regex as existing route.'),u.set(f.source,i)},a.prototype.matchMethod=function(e,n){var t=new URL(n),r=t.origin,o=t.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],n)},a.prototype._match=function(e,n,t){if(0===n.length)return null;for(var r=0;r<n.length;r++){var o=n[r],a=o&&o.get(e.toLowerCase());if(a){var i=c(a,t);if(i.length>0)return i[0].makeHandler(t)}}return null},a.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},n.exports=new a},{"./helpers":1,"./route":5}],7:[function(e,n,t){var r=e("../options"),o=e("../helpers");n.exports=function(e,n,t){return t=t||{},o.debug("Strategy: cache first ["+e.url+"]",t),o.openCache(t).then(function(n){return n.match(e).then(function(n){var c=t.cache||r.cache,a=Date.now();return o.isResponseFresh(n,c.maxAgeSeconds,a)?n:o.fetchAndCache(e,t)})})}},{"../helpers":1,"../options":4}],8:[function(e,n,t){var r=e("../options"),o=e("../helpers");n.exports=function(e,n,t){return t=t||{},o.debug("Strategy: cache only ["+e.url+"]",t),o.openCache(t).then(function(n){return n.match(e).then(function(e){var n=t.cache||r.cache,c=Date.now();if(o.isResponseFresh(e,n.maxAgeSeconds,c))return e})})}},{"../helpers":1,"../options":4}],9:[function(e,n,t){var r=e("../helpers"),o=e("./cacheOnly");n.exports=function(e,n,t){return r.debug("Strategy: fastest ["+e.url+"]",t),new Promise(function(c,a){var i=!1,s=[],u=function(e){s.push(e.toString()),i?a(new Error('Both cache and network failed: "'+s.join('", "')+'"')):i=!0},f=function(e){e instanceof Response?c(e):u("No result returned")};r.fetchAndCache(e.clone(),t).then(f,u),o(e,n,t).then(f,u)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,n,t){n.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,n,t){var r=e("../options"),o=e("../helpers");n.exports=function(e,n,t){var c=(t=t||{}).successResponses||r.successResponses,a=t.networkTimeoutSeconds||r.networkTimeoutSeconds;return o.debug("Strategy: network first ["+e.url+"]",t),o.openCache(t).then(function(n){var i,s,u=[];if(a){var f=new Promise(function(c){i=setTimeout(function(){n.match(e).then(function(e){var n=t.cache||r.cache,a=Date.now(),i=n.maxAgeSeconds;o.isResponseFresh(e,i,a)&&c(e)})},1e3*a)});u.push(f)}var h=o.fetchAndCache(e,t).then(function(e){if(i&&clearTimeout(i),c.test(e.status))return e;throw o.debug("Response was an HTTP error: "+e.statusText,t),s=e,new Error("Bad response")}).catch(function(r){return o.debug("Network or response error, fallback to cache ["+e.url+"]",t),n.match(e).then(function(e){if(e)return e;if(s)return s;throw r})});return u.push(h),Promise.race(u)})}},{"../helpers":1,"../options":4}],12:[function(e,n,t){var r=e("../helpers");n.exports=function(e,n,t){return r.debug("Strategy: network only ["+e.url+"]",t),fetch(e)}},{"../helpers":1}],13:[function(e,n,t){var r=e("./options"),o=e("./router"),c=e("./helpers"),a=e("./strategies"),i=e("./listeners");c.debug("Service Worker Toolbox is loading"),self.addEventListener("install",i.installListener),self.addEventListener("activate",i.activateListener),self.addEventListener("fetch",i.fetchListener),n.exports={networkOnly:a.networkOnly,networkFirst:a.networkFirst,cacheOnly:a.cacheOnly,cacheFirst:a.cacheFirst,fastest:a.fastest,router:o,options:r,cache:c.cache,uncache:c.uncache,precache:c.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,n,t){n.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,n,t){function r(e,n){for(var t,r=[],o=0,c=0,a="",u=n&&n.delimiter||"/";null!=(t=d.exec(e));){var f=t[0],h=t[1],p=t.index;if(a+=e.slice(c,p),c=p+f.length,h)a+=h[1];else{var l=e[c],m=t[2],g=t[3],v=t[4],x=t[5],w=t[6],b=t[7];a&&(r.push(a),a="");var y=null!=m&&null!=l&&l!==m,R="+"===w||"*"===w,E="?"===w||"*"===w,C=t[2]||u,k=v||x;r.push({name:g||o++,prefix:m||"",delimiter:C,optional:E,repeat:R,partial:y,asterisk:!!b,pattern:k?s(k):b?".*":"[^"+i(C)+"]+?"})}}return c<e.length&&(a+=e.substr(c)),a&&r.push(a),r}function o(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function a(e){for(var n=new Array(e.length),t=0;t<e.length;t++)"object"==typeof e[t]&&(n[t]=new RegExp("^(?:"+e[t].pattern+")$"));return function(t,r){for(var a="",i=t||{},s=(r||{}).pretty?o:encodeURIComponent,u=0;u<e.length;u++){var f=e[u];if("string"!=typeof f){var h,p=i[f.name];if(null==p){if(f.optional){f.partial&&(a+=f.prefix);continue}throw new TypeError('Expected "'+f.name+'" to be defined')}if(l(p)){if(!f.repeat)throw new TypeError('Expected "'+f.name+'" to not repeat, but received `'+JSON.stringify(p)+"`");if(0===p.length){if(f.optional)continue;throw new TypeError('Expected "'+f.name+'" to not be empty')}for(var d=0;d<p.length;d++){if(h=s(p[d]),!n[u].test(h))throw new TypeError('Expected all "'+f.name+'" to match "'+f.pattern+'", but received `'+JSON.stringify(h)+"`");a+=(0===d?f.prefix:f.delimiter)+h}}else{if(h=f.asterisk?c(p):s(p),!n[u].test(h))throw new TypeError('Expected "'+f.name+'" to match "'+f.pattern+'", but received "'+h+'"');a+=f.prefix+h}}else a+=f}return a}}function i(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function s(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function u(e,n){return e.keys=n,e}function f(e){return e.sensitive?"":"i"}function h(e,n,t){l(n)||(t=n||t,n=[]);for(var r=(t=t||{}).strict,o=!1!==t.end,c="",a=0;a<e.length;a++){var s=e[a];if("string"==typeof s)c+=i(s);else{var h=i(s.prefix),p="(?:"+s.pattern+")";n.push(s),s.repeat&&(p+="(?:"+h+p+")*"),c+=p=s.optional?s.partial?h+"("+p+")?":"(?:"+h+"("+p+"))?":h+"("+p+")"}}var d=i(t.delimiter||"/"),m=c.slice(-d.length)===d;return r||(c=(m?c.slice(0,-d.length):c)+"(?:"+d+"(?=$))?"),c+=o?"$":r&&m?"":"(?="+d+"|$)",u(new RegExp("^"+c,f(t)),n)}function p(e,n,t){return l(n)||(t=n||t,n=[]),t=t||{},e instanceof RegExp?function(e,n){var t=e.source.match(/\((?!\?)/g);if(t)for(var r=0;r<t.length;r++)n.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return u(e,n)}(e,n):l(e)?function(e,n,t){for(var r=[],o=0;o<e.length;o++)r.push(p(e[o],n,t).source);return u(new RegExp("(?:"+r.join("|")+")",f(t)),n)}(e,n,t):function(e,n,t){return h(r(e,t),n,t)}(e,n,t)}var l=e("isarray");n.exports=p,n.exports.parse=r,n.exports.compile=function(e,n){return a(r(e,n))},n.exports.tokensToFunction=a,n.exports.tokensToRegExp=h;var d=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,n,t){!function(){var e=Cache.prototype.addAll,n=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(n)var t=n[1],r=parseInt(n[2]);e&&(!n||"Firefox"===t&&r>=46||"Chrome"===t&&r>=50)||(Cache.prototype.addAll=function(e){function n(e){this.name="NetworkError",this.code=19,this.message=e}var t=this;return n.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var t=new URL(e.url).protocol;if("http:"!==t&&"https:"!==t)throw new n("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new n("Incorrect response status");return Promise.all(r.map(function(n,r){return t.put(e[r],n)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get(/https:\/\/fonts.googleapis.com\//,toolbox.cacheFirst,{});