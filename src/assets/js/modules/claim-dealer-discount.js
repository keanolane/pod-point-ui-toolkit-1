import { Delegate } from 'dom-delegate';
import { nodesToArray, addClass, removeClass, hasClass } from '@pod-point/dom-ops';
import { openPanel, closePanel, disableOrEnableButton, show, hide } from './../utilities';

let instances = [];
const IS_OPEN = 'is-open';

class ClaimDealerDiscount {

    /**
     * Creates a new dealership claim element.
     *
     * @param element
     */
    constructor(element) {
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
    bindEvents() {
        const dealershipInputListener = new Delegate(this.dealershipInput);
        dealershipInputListener.on('keyup', (event, element) => {
            this.checkForEligibility(element.value);
        });

        const claimDealershipListener = new Delegate(this.claimButton);
        claimDealershipListener.on('click', (event, element) => {
            event.preventDefault();
            this.claimDiscount();
        });
    }

    /**
     * User clicks to claim dealership discount
     */
    claimDiscount() {
        disableOrEnableButton(this.claimButton, true);
        closePanel(this.dealershipPanel);

        // Current numbers
        const currentOlevDiscount = parseInt(this.basket.getAttribute('data-olev-discount'));
        const currentDealerDiscount = parseInt(this.basket.getAttribute('data-dealer-discount'));
        const currentPodPointPrice = parseInt(this.podPointPriceEl.getAttribute('data-price'));
        const currentTotalPrice = parseInt(this.totalPriceEl.getAttribute('data-total-price'));
        // Calculations
        const dealerDiscount = 150;
        const newPodPointPrice = (currentPodPointPrice - currentOlevDiscount) - dealerDiscount;
        const newTotalPrice = (currentTotalPrice - currentOlevDiscount) - dealerDiscount;
        // DOM
        this.basket.setAttribute('data-dealer-discount', dealerDiscount);
        this.podPointPriceEl.innerHTML = '£' + newPodPointPrice;
        this.totalPriceEl.innerHTML = '£' + newTotalPrice;
        show(this.claimedDiscountText);
    }

    /**
     * Check if user types an eligible dealership
     */
    checkForEligibility(value) {
        const eligibleDealership = 'nissan';
        if (eligibleDealership === value) {
            disableOrEnableButton(this.claimButton, false);
            hide(this.notEligibleText);
            show(this.eligibleText);
        } else {
            disableOrEnableButton(this.claimButton, true);
            hide(this.eligibleText);
        }
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
    }
}

export default {
    init: function(element) {
        instances.push(new ClaimDealerDiscount(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
