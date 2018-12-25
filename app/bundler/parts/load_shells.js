/* eslint "func-names": 0, "prefer-arrow-callback": 0, "wrap-iife": 0 */

(function () {
  let shellName = '';
  const endpoints = window._ENDPOINTS || {};
  const endpointsRoutes = Object.keys(endpoints);
  const publicPath = window._PUBLIC_PATH || '/';

  function prepareRouteRegexp(route) {
    let str = route;

    str = str.replace(/:[^/]+/g, '((?:(?:%\\d{1,3})|[A-z!@#$%^&*\\d])+)');
    str = str.replace(/\*/, '.+');

    // Work around gh-pages URL
    let gitPathname = '';

    if (/https:\/\/([a-z-A-Z])\w+.github.io/g.exec(window.location.href)) {
      const pathname = /\/[^/]+/.exec(window.location.pathname);

      if (pathname) {
        gitPathname = pathname[0];
      }
    }

    return new RegExp(`^${gitPathname}${str}\\/?$`);
  }

  for (let i = 0; i < endpointsRoutes.length; i += 1) {
    const route = endpointsRoutes[i];
    const name = endpoints[route];
    const regExp = prepareRouteRegexp(route);
    const pathname = window.location.pathname;
    const paramValues = regExp.exec(pathname);

    if (paramValues !== null) {
      shellName = name;
      break;
    }
  }

  if (shellName) {
    fetch(`${publicPath}parts/${shellName}/index.html`)
      .then(res => res.text())
      .then((res) => {
        const root = document.getElementById('root');

        if (!root.getAttribute('data-loaded')) {
          root.innerHTML = res;
        }
      })
      .catch((err) => {
        console.log('Error load shell:', err);
      });
  }
})();
