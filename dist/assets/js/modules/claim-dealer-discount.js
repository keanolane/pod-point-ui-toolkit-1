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

var ClaimDealerDiscount = function () {

    /**
     * Creates a new dealership claim element.
     *
     * @param element
     */
    function ClaimDealerDiscount(element) {
        _classCallCheck(this, ClaimDealerDiscount);

        this.element = element;

        this.dealershipPanel = this.element.querySelector('#dealershipPanel');
        this.dealershipInput = this.dealershipPanel.querySelector('#dealershipInput');
        this.claimButton = this.dealershipPanel.querySelector('#claimDealershipButton');
        this.confirmEligible = this.element.querySelector('#confirmDealershipEligible');

        this.eligibleText = this.element.querySelector('#dealerDiscountEligibleText');
        this.notEligibleText = this.element.querySelector('#dealerDiscountNotEligibleText');

        this.basket = document.querySelector('#basketFinal');
        this.podPointProduct = this.basket.querySelector('[data-item="unit"]');
        this.claimedDealerDiscountBasketText = this.basket.querySelector('#claimedDealerDiscountBasket');
        this.podPointPriceEl = this.podPointProduct.querySelector('[data-price]');
        this.totalPriceEl = this.basket.querySelector('[data-total-price]');
        this.claimedDiscountText = this.basket.querySelector('#claimedDealerDiscountBasket');

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(ClaimDealerDiscount, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            var dealershipInputListener = new _domDelegate.Delegate(this.dealershipInput);
            dealershipInputListener.on('keyup', function (event, element) {
                _this.checkForEligibility(element.value);
            });

            var claimDealershipListener = new _domDelegate.Delegate(this.claimButton);
            claimDealershipListener.on('click', function (event, element) {
                event.preventDefault();
                _this.claimDiscount();
            });
        }

        /**
         * User clicks to claim dealership discount
         */

    }, {
        key: 'claimDiscount',
        value: function claimDiscount() {
            (0, _utilities.disableOrEnableButton)(this.claimButton, true);
            (0, _utilities.closePanel)(this.dealershipPanel);

            // Current numbers
            var currentOlevDiscount = parseInt(this.basket.getAttribute('data-olev-discount'));
            var currentDealerDiscount = parseInt(this.basket.getAttribute('data-dealer-discount'));
            var currentPodPointPrice = parseInt(this.podPointPriceEl.getAttribute('data-price'));
            var currentTotalPrice = parseInt(this.totalPriceEl.getAttribute('data-total-price'));
            // Calculations
            var dealerDiscount = 150;
            var newPodPointPrice = currentPodPointPrice - currentOlevDiscount - dealerDiscount;
            var newTotalPrice = currentTotalPrice - currentOlevDiscount - dealerDiscount;
            // DOM
            this.basket.setAttribute('data-dealer-discount', dealerDiscount);
            this.podPointPriceEl.innerHTML = '£' + newPodPointPrice;
            this.totalPriceEl.innerHTML = '£' + newTotalPrice;
            (0, _utilities.show)(this.claimedDiscountText);
        }

        /**
         * Check if user types an eligible dealership
         */

    }, {
        key: 'checkForEligibility',
        value: function checkForEligibility(value) {
            var eligibleDealership = 'nissan';
            if (eligibleDealership === value) {
                (0, _utilities.disableOrEnableButton)(this.claimButton, false);
                (0, _utilities.hide)(this.notEligibleText);
                (0, _utilities.show)(this.eligibleText);
            } else {
                (0, _utilities.disableOrEnableButton)(this.claimButton, true);
                (0, _utilities.hide)(this.eligibleText);
            }
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {}
    }]);

    return ClaimDealerDiscount;
}();

exports.default = {
    init: function init(element) {
        instances.push(new ClaimDealerDiscount(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};