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
        this.claimOlevButton = this.olevPanel.querySelector('#claimOlevButton');
        this.olevRadios = this.olevPanel.querySelectorAll('input[type="radio"]');
        this.olevRadiosWraps = this.olevPanel.querySelectorAll('.radios-wrap');

        this.dealershipPanel = this.element.querySelector('#dealershipPanel');
        this.dealershipInput = this.dealershipPanel.querySelector('#dealershipInput');
        this.claimDealershipButton = this.dealershipPanel.querySelector('#claimDealershipButton');

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

            var claimOlevListener = new _domDelegate.Delegate(this.claimOlevButton);
            claimOlevListener.on('click', function (event, element) {
                event.preventDefault();
                _this.claimedOlev();
            });

            var dealershipInputListener = new _domDelegate.Delegate(this.dealershipInput);
            dealershipInputListener.on('keyup', function (event, element) {
                _this.checkForEligibleDealership(element.value);
            });

            var claimDealershipListener = new _domDelegate.Delegate(this.claimDealershipButton);
            claimDealershipListener.on('click', function (event, element) {
                event.preventDefault();
                _this.claimedDealership();
            });
        }

        /**
         * Check
         */

    }, {
        key: 'checkAllRadios',
        value: function checkAllRadios() {
            var allRadiosAreSelected = (0, _utilities.allRadiosSelected)(this.olevRadiosWraps);
            var aRadioContainsNo = (0, _utilities.aRadioContains)(this.olevRadios, 'no');

            if (aRadioContainsNo) {
                this.notOlevEligible();
            } else if (allRadiosAreSelected) {
                // Activate buuton to claim Olev
                (0, _utilities.disableOrEnableButton)(this.claimOlevButton, false);
            }
        }

        /**
         * If user is not eligible
         */

    }, {
        key: 'notOlevEligible',
        value: function notOlevEligible() {
            (0, _utilities.disableOrEnableButton)(this.claimOlevButton, true);
            alert('sorry you do not qualify for the OLEV grant');
            (0, _utilities.closePanel)(this.olevPanel);
        }

        /**
         * User clicks to claim Olev
         */

    }, {
        key: 'claimedOlev',
        value: function claimedOlev() {
            alert('you have 500 off your bill');
            (0, _utilities.disableOrEnableButton)(this.claimOlevButton, true);
            (0, _utilities.closePanel)(this.olevPanel);
        }

        /**
         * User clicks to claim dealership
         */

    }, {
        key: 'claimedDealership',
        value: function claimedDealership() {
            alert('you have 150 off your bill');
            (0, _utilities.disableOrEnableButton)(this.claimDealershipButton, true);
            (0, _utilities.closePanel)(this.dealershipPanel);
        }

        /**
         * Check if user types an eligible dealership
         */

    }, {
        key: 'checkForEligibleDealership',
        value: function checkForEligibleDealership(value) {
            var eligibleDealership = 'nissan';
            if (eligibleDealership === value) {
                (0, _utilities.disableOrEnableButton)(this.claimDealershipButton, false);
            } else {
                (0, _utilities.disableOrEnableButton)(this.claimDealershipButton, true);
            }
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