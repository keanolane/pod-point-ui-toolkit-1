'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var CheckoutYourPodPoint = function () {

    /**
     * Creates a new form element.
     *
     * @param element
     */
    function CheckoutYourPodPoint(element) {
        _classCallCheck(this, CheckoutYourPodPoint);

        this.element = element;

        this.selectEvMake = this.element.querySelector('#selectEvMake');
        this.selectEvModel = this.element.querySelector('#selectEvMake');
        this.carImage = this.element.querySelector('#carImage');
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(CheckoutYourPodPoint, [{
        key: 'bindEvents',
        value: function bindEvents() {}

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {}
    }]);

    return CheckoutYourPodPoint;
}();

exports.default = {
    init: function init(element) {
        instances.push(new CheckoutYourPodPoint(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};