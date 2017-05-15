'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inlineSvg = require('inline-svg');

var _inlineSvg2 = _interopRequireDefault(_inlineSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var inlineSvg = function () {

    /**
     */
    function inlineSvg() {
        var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

        _classCallCheck(this, inlineSvg);

        this.makeInline();
    }

    /**
     */


    _createClass(inlineSvg, [{
        key: 'makeInline',
        value: function makeInline() {
            _inlineSvg2.default.init({
                svgSelector: 'img.svg', // the class attached to all images that should be inlined
                initClass: 'js-inlinesvg' }, function () {
                console.log('All SVGs inlined');
            });
        }
    }]);

    return inlineSvg;
}();

exports.default = {
    init: function init(root) {
        instances.push(new inlineSvg(root));
    }
};