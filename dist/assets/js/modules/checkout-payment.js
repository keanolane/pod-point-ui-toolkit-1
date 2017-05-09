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
var CLAIMED_OLEV = 'claimed-olev';

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
        this.confirmNotOlevEligible = this.element.querySelector('#confirmNotOlevEligible');
        this.confirmClaimedOlev = this.element.querySelector('#confirmClaimedOlev');
        this.confirmUnsureClaimOlev = this.element.querySelector('#confirmUnsureClaimOlev');

        this.podPointProduct = document.querySelector('[data-item="unit"]');

        this.dealershipPanel = this.element.querySelector('#dealershipPanel');
        this.dealershipInput = this.dealershipPanel.querySelector('#dealershipInput');
        this.claimDealershipButton = this.dealershipPanel.querySelector('#claimDealershipButton');
        this.confirmDealershipEligible = this.element.querySelector('#confirmDealershipEligible');

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
                    _this.checkAllOlevRadios();
                });
            });

            var claimOlevListener = new _domDelegate.Delegate(this.claimOlevButton);
            claimOlevListener.on('click', function (event, element) {
                event.preventDefault();
                _this.checkForUnsure();
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
        key: 'checkAllOlevRadios',
        value: function checkAllOlevRadios() {
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
            (0, _utilities.show)(this.confirmNotOlevEligible);
            (0, _utilities.closePanel)(this.olevPanel);
        }
    }, {
        key: 'checkForUnsure',
        value: function checkForUnsure() {
            var aRadioContainsUnsure = (0, _utilities.aRadioContains)(this.olevRadios, 'unsure');
            if (aRadioContainsUnsure) {
                (0, _utilities.show)(this.confirmUnsureClaimOlev);
            } else {
                this.claimOlev();
            }
        }

        /**
         * Apply OLEV claim
         */

    }, {
        key: 'claimOlev',
        value: function claimOlev() {
            (0, _utilities.disableOrEnableButton)(this.claimOlevButton, true);
            (0, _utilities.closePanel)(this.olevPanel);
            (0, _domOps.addClass)(this.podPointProduct, CLAIMED_OLEV);
        }

        /**
         * User clicks to claim dealership
         */

    }, {
        key: 'claimedDealership',
        value: function claimedDealership() {
            (0, _utilities.show)(this.confirmDealershipEligible);
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