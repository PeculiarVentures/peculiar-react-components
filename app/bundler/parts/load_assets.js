/* eslint "func-names": 0, "prefer-arrow-callback": 0, "wrap-iife": 0 */

(function () {
  const cssFiles = window._CSS_FILES || [];
  const jsFiles = window._JS_FILES || [];
  const arr = [];

  function loadScript(scriptUrl) {
    return new Promise(function (resolve) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;

      document.body.appendChild(script);

      script.onload = resolve;
    });
  }
  function loadStyle(styleUrl) {
    return new Promise(function (resolve) {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.href = styleUrl;
      document.head.appendChild(link);

      link.onload = resolve;
    });
  }

  for (let i = 0; i < cssFiles.length; i += 1) {
    arr.push(loadStyle(cssFiles[i]));
  }
  for (let i = 0; i < jsFiles.length; i += 1) {
    arr.push(loadScript(jsFiles[i]));
  }

  Promise.all(arr)
    .then(function () {
      console.log('LOADED ALL FILES!');
    });
})();
