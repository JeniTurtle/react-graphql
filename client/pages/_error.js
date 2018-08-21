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
exports.__esModule = true;
var react_1 = require("react");
var head_1 = require("next/head");
var ErrorPage = /** @class */ (function (_super) {
    __extends(ErrorPage, _super);
    function ErrorPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorPage.getInitialProps = function (_a) {
        var res = _a.res, err = _a.err;
        var statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return {
            statusCode: statusCode,
            error: err ? err.message || err.name : ''
        };
    };
    ErrorPage.prototype.render = function () {
        var _a = this.props, statusCode = _a.statusCode, error = _a.error;
        var title = statusCode === 404
            ? '😱每个人都需要面对一个未知的世界。'
            : "\uD83D\uDE02\u4E00\u4E2A\u672A\u77E5\u7684\u5F02\u5E38...";
        return (<div style={styles.error}>
        <head_1["default"]>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head_1["default"]>

        <div>
          <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0 }' }}/>
          {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
          <div style={styles.desc}>
            <h2 style={styles.h2}>{title}.</h2>
            <p style={{ color: '#fff' }}>{error}</p>
          </div>
        </div>
      </div>);
    };
    return ErrorPage;
}(react_1["default"].Component));
exports["default"] = ErrorPage;
var styles = {
    error: {
        color: '#000',
        background: '#fff',
        fontFamily: 
        // tslint:disable-next-line:max-line-length
        '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        display: 'inline-block',
        textAlign: 'left',
        lineHeight: '49px',
        height: '49px',
        verticalAlign: 'middle'
    },
    h1: {
        display: 'inline-block',
        borderRight: '1px solid rgba(0, 0, 0,.3)',
        margin: 0,
        marginRight: '20px',
        padding: '10px 23px 10px 0',
        fontSize: '24px',
        fontWeight: 500,
        verticalAlign: 'top'
    },
    h2: {
        fontSize: '16px',
        lineHeight: 'inherit',
        margin: 0,
        padding: 0
    }
};
