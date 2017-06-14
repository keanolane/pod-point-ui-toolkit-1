'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domOps = require('@pod-point/dom-ops');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
    function Base() {
        var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

        _classCallCheck(this, Base);

        this.defineSizeAndDevice();
    }

    _createClass(Base, [{
        key: 'defineSizeAndDevice',
        value: function defineSizeAndDevice() {
            window.isTouchDevice = 'ontouchstart' in document.documentElement ? true : false;
            var winWidthMedium = 800;
            var winWidth = window.innerWidth;
            window.isMobileSize = winWidth < winWidthMedium ? true : false;
            window.onload = function () {
                isTouchDevice ? (0, _domOps.addClass)(document.body, 'is-touch') : (0, _domOps.addClass)(document.body, 'is-desktop');
            };
        }
    }]);

    return Base;
}();

exports.default = {
    init: function init() {
        new Base();
    }
};