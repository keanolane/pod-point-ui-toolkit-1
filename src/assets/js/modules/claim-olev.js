import { Delegate } from 'dom-delegate';
import { nodesToArray, addClass, removeClass, hasClass } from '@pod-point/dom-ops';
import { openPanel, closePanel, allRadiosSelected, aRadioContains, disableOrEnableButton, show, hide } from './../utilities';

let instances = [];
const IS_OPEN = 'is-open';
const CLAIMED_OLEV = 'claimed-olev';

class ClaimOlev {

    /**
     * Creates a claim olev element.
     *
     * @param element
     */
    constructor(element) {
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
    bindEvents() {
        this.radioListeners = [];
        this.radios.forEach(radio => {
            const radioListener = new Delegate(radio);
            this.radioListeners.push(radioListener);
            radioListener.on('change', (event, element) => {
                this.checkAllRadios();
            });
        });

        const claimListener = new Delegate(this.claimButton);
        claimListener.on('click', (event, element) => {
            event.preventDefault();
            this.checkForUnsure();
        });

        const claimUnsureListener = new Delegate(this.claimUnsureButton);
        claimUnsureListener.on('click', (event, element) => {
            event.preventDefault();
            this.claimOlev();
        });
    }

    /**
     * Check all radios for any selected as 'no' and if all have been selected
     */
    checkAllRadios() {
        const allRadiosAreSelected = allRadiosSelected(this.radiosWraps);
        const aRadioContainsNo = aRadioContains(this.radios, 'no');

        if (aRadioContainsNo) {
            this.notEligible();
        } else if (allRadiosAreSelected) {
            disableOrEnableButton(this.claimButton, false);
        }
    }

    /**
     * If user is not eligible
     */
    notEligible() {
        disableOrEnableButton(this.claimButton, true);
        show(this.confirmNotEligible);
        closePanel(this.olevPanel);

        removeClass(this.podPointProduct, CLAIMED_OLEV);
        hide(this.claimedOlevBasketText);
        show(this.claimOlevBasketCta);

        this.applyCalculations(0);
    }

    /**
     * Apply calculations to basket in the DOM
     */
    applyCalculations(olevGrant) {
        // Current numbers
        const currentOlevDiscount = parseInt(this.basket.getAttribute('data-olev-discount'));
        const currentDealerDiscount = parseInt(this.basket.getAttribute('data-dealer-discount'));
        const currentPodPointPrice = parseInt(this.podPointPriceEl.getAttribute('data-price'));
        const currentTotalPrice = parseInt(this.totalPriceEl.getAttribute('data-total-price'));
        // Calculations
        const newPodPointPrice = (currentPodPointPrice - currentDealerDiscount) - olevGrant;
        const newTotalPrice = (currentTotalPrice - currentDealerDiscount) - olevGrant;
        // DOM
        this.basket.setAttribute('data-olev-discount', olevGrant);
        this.podPointPriceEl.innerHTML = '£' + newPodPointPrice;
        this.totalPriceEl.innerHTML = '£' + newTotalPrice;
    }

    /**
     * Check if any radios are selected as 'unsure'
     */
    checkForUnsure() {
        const aRadioContainsUnsure = aRadioContains(this.radios, 'unsure');
        (aRadioContainsUnsure) ? show(this.confirmUnsureClaim) : this.claimOlev();
    }

    /**
     * Apply OLEV claim
     */
    claimOlev() {
        disableOrEnableButton(this.claimButton, true);
        closePanel(this.olevPanel);

        addClass(this.podPointProduct, CLAIMED_OLEV);
        hide(this.claimOlevBasketCta);
        show(this.claimedOlevBasketText);

        this.applyCalculations(500);
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.radioListeners.forEach(radioListener => radioListener.destroy());
    }
}

export default {
    init: function(element) {
        instances.push(new ClaimOlev(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
