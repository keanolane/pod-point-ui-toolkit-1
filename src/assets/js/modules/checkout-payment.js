import { Delegate } from 'dom-delegate';
import { nodesToArray, addClass, removeClass, hasClass } from '@pod-point/dom-ops';
import { openPanel, closePanel } from './../utilities';

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
        this.olevRadios = this.olevPanel.querySelectorAll('input[type="radio"]');

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
    }


    /**
     * Check
     */
    checkAllRadios() {
        this.olevRadios.forEach(olevRadio => {
            if (olevRadio.checked) {
                if (hasClass(olevRadio, 'no')) { this.notOlevEligible() }
            }
        });
    }

    /**
     * If user is not eligible
     */
    notOlevEligible() {
        alert('sorry you do not qualify for the OLEV grant');
        closePanel(this.olevPanel);
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
