"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slickCarousel = require("slick-carousel");

var _slickCarousel2 = _interopRequireDefault(_slickCarousel);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var Carousel = function () {

    /**
     * Create a new carousel element.
     *
     * @param select wrapper
     */
    function Carousel(element) {
        _classCallCheck(this, Carousel);

        this.element = element;
        this.slick();
    }

    _createClass(Carousel, [{
        key: "slick",
        value: function slick() {
            (0, _jquery2.default)(this.element).slick();
        }
    }]);

    return Carousel;
}();

exports.default = {
    init: function init(element) {
        instances.push(new Carousel(element));
    }
};