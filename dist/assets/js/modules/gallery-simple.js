'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

var _utilities = require('./../utilities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var GallerySimple = function () {

    /**
     * Creates a gallery element.
     *
     * @param element
     */
    function GallerySimple(element) {
        _classCallCheck(this, GallerySimple);

        this.element = element;
        this.bindEvents();
    }

    /**
     * Bind any event listeners to the elements.
     */


    _createClass(GallerySimple, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.listener = new _domDelegate.Delegate(this.element);

            this.listener.on('click', 'li a', function (event, thumbnail) {
                event.preventDefault();
                _this.displayThumbnailAsImage(thumbnail);
            });
        }

        /**
         * Display thumbnail as main image.
         */

    }, {
        key: 'displayThumbnailAsImage',
        value: function displayThumbnailAsImage(thumbnail) {
            var thumbnailSrc = thumbnail.querySelector('img').src;
            var mainImage = this.element.querySelector('.gallery-simple__image');

            mainImage.src = thumbnailSrc;
        }
    }]);

    return GallerySimple;
}();

exports.default = {
    init: function init(element) {
        instances.push(new GallerySimple(element));
    }
};