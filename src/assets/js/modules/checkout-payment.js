import { Delegate } from 'dom-delegate';
import { nodesToArray, addClass, removeClass, hasClass } from '@pod-point/dom-ops';
import { openPanel, closePanel, allRadiosSelected, aRadioContains, disableOrEnableButton } from './../utilities';

let instances = [];
const IS_OPEN = 'is-open';

class CheckoutPayment {

    /**
     * Creates a new form element.
     *
     * @param element
     */
    constructor(element) {
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
    bindEvents() {
        this.olevRadioListeners = [];
        this.olevRadios.forEach(olevRadio => {
            const olevRadioListener = new Delegate(olevRadio);
            this.olevRadioListeners.push(olevRadioListener);
            olevRadioListener.on('change', (event, element) => {
                this.checkAllRadios();
            });
        });

        const claimOlevListener = new Delegate(this.claimOlevButton);
        claimOlevListener.on('click', (event, element) => {
            event.preventDefault();
            this.claimedOlev();
        });

        const dealershipInputListener = new Delegate(this.dealershipInput);
        dealershipInputListener.on('keyup', (event, element) => {
            this.checkForEligibleDealership(element.value);
        });

        const claimDealershipListener = new Delegate(this.claimDealershipButton);
        claimDealershipListener.on('click', (event, element) => {
            event.preventDefault();
            this.claimedDealership();
        });
    }

    /**
     * Check
     */
    checkAllRadios() {
        const allRadiosAreSelected = allRadiosSelected(this.olevRadiosWraps);
        const aRadioContainsNo = aRadioContains(this.olevRadios, 'no');

        if (aRadioContainsNo) {
            this.notOlevEligible();
        } else if (allRadiosAreSelected) {
            // Activate buuton to claim Olev
            disableOrEnableButton(this.claimOlevButton, false);
        }
    }

    /**
     * If user is not eligible
     */
    notOlevEligible() {
        disableOrEnableButton(this.claimOlevButton, true);
        alert('sorry you do not qualify for the OLEV grant');
        closePanel(this.olevPanel);
    }

    /**
     * User clicks to claim Olev
     */
    claimedOlev() {
        alert('you have 500 off your bill');
        disableOrEnableButton(this.claimOlevButton, true);
        closePanel(this.olevPanel);
    }

    /**
     * User clicks to claim dealership
     */
    claimedDealership() {
        alert('you have 150 off your bill');
        disableOrEnableButton(this.claimDealershipButton, true);
        closePanel(this.dealershipPanel);
    }

    /**
     * Check if user types an eligible dealership
     */
    checkForEligibleDealership(value) {
        const eligibleDealership = 'nissan';
        if (eligibleDealership === value) {
            disableOrEnableButton(this.claimDealershipButton, false);
        } else {
            disableOrEnableButton(this.claimDealershipButton, true);
        }
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.olevRadioListeners.forEach(olevRadioListener => olevRadioListener.destroy());
    }
}

export default {
    init: function(element) {
        instances.push(new CheckoutPayment(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
