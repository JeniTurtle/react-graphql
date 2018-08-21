"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require('isomorphic-unfetch');
var react_1 = require("react");
var document_1 = require("next/document");
var moment_1 = require("moment");
require("moment/locale/zh-cn");
moment_1["default"].locale('zh-cn');
var _helmet_1 = require("./_helmet");
require("./_polyfill");
var serialize = require('serialize-javascript');
var clientConfig = {
    mode: PKG.env.mode,
    unAuthedGraphqlUri: PKG.env.unAuthedGraphqlUri,
    graphqlUri: PKG.env.graphqlUri
};
var inlineScript = function (body) { return (<script type="text/javascript" dangerouslySetInnerHTML={{ __html: body }}/>); };
var NextDocument = /** @class */ (function (_super) {
    __extends(NextDocument, _super);
    function NextDocument() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @see: https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
    // For the initial page load, getInitialProps will execute on the server only.
    // pathname - path section of URL
    // query - query string section of URL parsed as an object
    // asPath - the actual url path
    // req - HTTP request object (server only)
    // res - HTTP response object (server only)
    // jsonPageRes - Fetch Response object (client only)
    // err - Error object if any error is encountered during the rendering
    NextDocument.getInitialProps = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var props;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.getInitialProps.call(this, ctx)];
                    case 1:
                        props = _a.sent();
                        return [2 /*return*/, __assign({}, props)];
                }
            });
        });
    };
    NextDocument.prototype.render = function () {
        var title = this.props.title;
        return (<html lang="zh-cmn-Hans">
        <document_1.Head>
          <title>{title || '琢瑜'}</title>
          {_helmet_1.metas.map(function (mt, i) { return <meta key={"meta" + i} {...mt}/>; })}
          {_helmet_1.links.map(function (ln, i) { return <link key={"link" + i} {...ln}/>; })}
          <link {..._helmet_1.css.antd}/>
        </document_1.Head>
        <body>
          <document_1.Main />
          <script type="text/javascript" dangerouslySetInnerHTML={{
            __html: "window.__CLIENT_CONFIG__=" + serialize(clientConfig)
        }}/>
          {inlineScript(_helmet_1.TEST_PROMISE)}
          {_helmet_1.scripts.map(function (sc, i) { return <script key={"script" + i} {...sc}/>; })}
          <document_1.NextScript />
        </body>
      </html>);
    };
    return NextDocument;
}(document_1["default"]));
exports["default"] = NextDocument;
