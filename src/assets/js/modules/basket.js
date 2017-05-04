import { Delegate } from 'dom-delegate';

let instances = [];

class Basket {

    /**
     * Creates a new basket element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;
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
        instances.push(new Basket(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
