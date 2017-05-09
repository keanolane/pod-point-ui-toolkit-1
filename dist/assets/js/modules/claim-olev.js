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

var ClaimOlev = function () {

    /**
     * Creates a claim olev element.
     *
     * @param element
     */
    function ClaimOlev(element) {
        _classCallCheck(this, ClaimOlev);

        this.element = element;

        this.olevPanel = this.element.querySelector('#olevPanel');
        this.claimButton = this.olevPanel.querySelector('#claimOlevButton');

        this.radios = this.olevPanel.querySelectorAll('input[type="radio"]');
        this.radiosWraps = this.olevPanel.querySelectorAll('.radios-wrap');

        this.confirmNotEligible = this.element.querySelector('#confirmNotOlevEligible');
        this.confirmUnsureClaim = this.element.querySelector('#confirmUnsureClaimOlev');
        this.claimUnsureButton = this.element.querySelector('#claimUnsureOlevButton');

        this.basket = document.querySelector('#basketFinal');
        this.podPointProduct = this.basket.querySelector('[data-item="unit"]');
        this.claimOlevBasketCta = this.basket.querySelector('#claimOlevBasketCta');
        this.claimedOlevBasketText = this.basket.querySelector('#claimedOlevBasket');
        this.podPointPriceEl = this.podPointProduct.querySelector('[data-price]');
        this.totalPriceEl = this.basket.querySelector('[data-total-price]');
        this.claimedDiscountText = this.basket.querySelector('#claimedDealerDiscountBasket');

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(ClaimOlev, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.radioListeners = [];
            this.radios.forEach(function (radio) {
                var radioListener = new _domDelegate.Delegate(radio);
                _this.radioListeners.push(radioListener);
                radioListener.on('change', function (event, element) {
                    _this.checkAllRadios();
                });
            });

            var claimListener = new _domDelegate.Delegate(this.claimButton);
            claimListener.on('click', function (event, element) {
                event.preventDefault();
                _this.checkForUnsure();
            });

            var claimUnsureListener = new _domDelegate.Delegate(this.claimUnsureButton);
            claimUnsureListener.on('click', function (event, element) {
                event.preventDefault();
                _this.claimOlev();
            });
        }

        /**
         * Check all radios for any selected as 'no' and if all have been selected
         */

    }, {
        key: 'checkAllRadios',
        value: function checkAllRadios() {
            var allRadiosAreSelected = (0, _utilities.allRadiosSelected)(this.radiosWraps);
            var aRadioContainsNo = (0, _utilities.aRadioContains)(this.radios, 'no');

            if (aRadioContainsNo) {
                this.notEligible();
            } else if (allRadiosAreSelected) {
                (0, _utilities.disableOrEnableButton)(this.claimButton, false);
            }
        }

        /**
         * If user is not eligible
         */

    }, {
        key: 'notEligible',
        value: function notEligible() {
            (0, _utilities.disableOrEnableButton)(this.claimButton, true);
            (0, _utilities.show)(this.confirmNotEligible);
            (0, _utilities.closePanel)(this.olevPanel);

            (0, _domOps.removeClass)(this.podPointProduct, CLAIMED_OLEV);
            (0, _utilities.hide)(this.claimedOlevBasketText);
            (0, _utilities.show)(this.claimOlevBasketCta);

            this.applyCalculations(0);
        }

        /**
         * Apply calculations to basket in the DOM
         */

    }, {
        key: 'applyCalculations',
        value: function applyCalculations(olevGrant) {
            // Current numbers
            var currentOlevDiscount = parseInt(this.basket.getAttribute('data-olev-discount'));
            var currentDealerDiscount = parseInt(this.basket.getAttribute('data-dealer-discount'));
            var currentPodPointPrice = parseInt(this.podPointPriceEl.getAttribute('data-price'));
            var currentTotalPrice = parseInt(this.totalPriceEl.getAttribute('data-total-price'));
            // Calculations
            var newPodPointPrice = currentPodPointPrice - currentDealerDiscount - olevGrant;
            var newTotalPrice = currentTotalPrice - currentDealerDiscount - olevGrant;
            // DOM
            this.basket.setAttribute('data-olev-discount', olevGrant);
            this.podPointPriceEl.innerHTML = '£' + newPodPointPrice;
            this.totalPriceEl.innerHTML = '£' + newTotalPrice;
        }

        /**
         * Check if any radios are selected as 'unsure'
         */

    }, {
        key: 'checkForUnsure',
        value: function checkForUnsure() {
            var aRadioContainsUnsure = (0, _utilities.aRadioContains)(this.radios, 'unsure');
            aRadioContainsUnsure ? (0, _utilities.show)(this.confirmUnsureClaim) : this.claimOlev();
        }

        /**
         * Apply OLEV claim
         */

    }, {
        key: 'claimOlev',
        value: function claimOlev() {
            (0, _utilities.disableOrEnableButton)(this.claimButton, true);
            (0, _utilities.closePanel)(this.olevPanel);

            (0, _domOps.addClass)(this.podPointProduct, CLAIMED_OLEV);
            (0, _utilities.hide)(this.claimOlevBasketCta);
            (0, _utilities.show)(this.claimedOlevBasketText);

            this.applyCalculations(500);
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.radioListeners.forEach(function (radioListener) {
                return radioListener.destroy();
            });
        }
    }]);

    return ClaimOlev;
}();

exports.default = {
    init: function init(element) {
        instances.push(new ClaimOlev(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};