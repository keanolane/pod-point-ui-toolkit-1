import { Delegate } from 'dom-delegate';

let instances = [];

class CheckoutYourPodPoint {

    /**
     * Creates a new form element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;

        this.selectEvMake = this.element.querySelector('#selectEvMake');
        this.selectEvModel = this.element.querySelector('#selectEvMake');
        this.carImage = this.element.querySelector('#carImage');
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {

    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
    }
}

export default {
    init: function(element) {
        instances.push(new CheckoutYourPodPoint(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
