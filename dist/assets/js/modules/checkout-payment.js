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
var IS_OPEN = 'is-open';

var CheckoutPayment = function () {

    /**
     * Creates a new form element.
     *
     * @param element
     */
    function CheckoutPayment(element) {
        _classCallCheck(this, CheckoutPayment);

        this.element = element;

        this.olevPanel = this.element.querySelector('#olevPanel');
        this.olevRadios = this.olevPanel.querySelectorAll('input[type="radio"]');

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(CheckoutPayment, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.olevRadioListeners = [];
            this.olevRadios.forEach(function (olevRadio) {
                var olevRadioListener = new _domDelegate.Delegate(olevRadio);
                _this.olevRadioListeners.push(olevRadioListener);
                olevRadioListener.on('change', function (event, element) {
                    _this.checkAllRadios();
                });
            });
        }

        /**
         * Check
         */

    }, {
        key: 'checkAllRadios',
        value: function checkAllRadios() {
            var _this2 = this;

            this.olevRadios.forEach(function (olevRadio) {
                if (olevRadio.checked) {
                    if ((0, _domOps.hasClass)(olevRadio, 'no')) {
                        _this2.notOlevEligible();
                    }
                }
            });
        }

        /**
         * If user is not eligible
         */

    }, {
        key: 'notOlevEligible',
        value: function notOlevEligible() {
            alert('sorry you do not qualify for the OLEV grant');
            (0, _utilities.closePanel)(this.olevPanel);
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.olevRadioListeners.forEach(function (olevRadioListener) {
                return olevRadioListener.destroy();
            });
        }
    }]);

    return CheckoutPayment;
}();

exports.default = {
    init: function init(element) {
        instances.push(new CheckoutPayment(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};