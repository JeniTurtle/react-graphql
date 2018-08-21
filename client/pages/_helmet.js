"use strict";
exports.__esModule = true;
var css = {
    antd: {
        rel: 'stylesheet',
        type: 'text/css',
        href: PKG.externals.antd.css
    }
};
exports.css = css;
var metas = [
    { name: 'charset', content: 'utf-8' },
    { name: 'description', content: 'jouryu' },
    { httpEquiv: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
    { httpEquiv: 'Cache-Control', content: 'no-siteapp' },
    { name: 'renderer', content: 'webkit' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#F2F5F8' }
];
exports.metas = metas;
var links = [
    { rel: 'dns-prefetch', href: 'https://at.alicdn.com' }
];
exports.links = links;
var scripts = [];
exports.scripts = scripts;
var es6Promise = PKG.externals['es6-promise'];
// tslint:disable:max-line-length
var TEST_PROMISE = "window.Promise || document.write('<script type=\"text/javascript\" src=\"" + es6Promise + "\" crossorigin=\"anonymous\"></script>');";
exports.TEST_PROMISE = TEST_PROMISE;
