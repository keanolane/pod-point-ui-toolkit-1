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
        this.selectEvModel = this.element.querySelector('#selectEvModel');
        this.carImage = this.element.querySelector('#carImage');

        this.productEls = (0, _domOps.nodesToArray)(document.querySelectorAll('.product'));
        this.basketObj = (0, _utilities.readItemFromCookie)('basketObj');
        // if (this.basketObj) { this.preselectFields() }

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(CheckoutYourPodPoint, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.selectEVMakeListener = new _domDelegate.Delegate(this.selectEvMake);

            this.selectEVMakeListener.on('change', function (event, element) {
                (0, _utilities.disableOrEnableDd)(_this.selectEvModel);
            });

            this.selectEVModelListener = new _domDelegate.Delegate(this.selectEvModel);

            this.selectEVModelListener.on('change', function (event, element) {
                _this.carImage.src = "assets/img/content/cars/nissan.png";
            });
        }
    }, {
        key: 'preselectFields',
        value: function preselectFields() {
            console.log(this.basketObj.items);

            if (this.basketObj.items.podPointUnit) this.productEls.forEach(function (productEl) {

                console.log(productEl.getAttribute('name'));
                productEl.checked = true;
            });
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.selectEVMakeListener.destroy();
            this.selectEVModelListener.destroy();
        }
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