import { Delegate } from 'dom-delegate';
import { isVisible, hide, show } from './../utilities';

let instances = [];

class Collapse {

    /**
     * Creates a new collapsible element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;

        this.bindEvents();
    }

    /**
     * Bind any event listeners to the elements.
     */
    bindEvents() {
        this.listener = new Delegate(this.element);

        this.listener.on('click', (event, input) => {
            this.doCollapse(event, input);
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.listener.destroy();
    }

    /**
     * Collapses the element
     * @param {Event} event
     * @param {Element} trigger
     */
    doCollapse(event, trigger) {
        event.preventDefault();

        let target = trigger.getAttribute('data-target');
        let element = trigger.parentNode.querySelector(target);

        if (isVisible(element)) {
            hide(element, trigger);
        } else {
            show(element, trigger);
        }
    }

}

export default {
    init: function(element) {
        instances.push(new Collapse(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
