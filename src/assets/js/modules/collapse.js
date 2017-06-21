import { Delegate } from 'dom-delegate';
import { isVisible, hide, show } from './../utilities';

let instances = [];

class Collapse {

    /**
     * Creates a new collapsible element
     *
     * @param {element}
     */
    constructor(element) {
        this.element = element;
        this.bindEvents();
    }

    /**
     * Bind any event listeners to the elements
     */
    bindEvents() {
        this.listener = new Delegate(this.element);

        this.listener.on('click', (event, input) => {
            this.doCollapse(event, input);
        });
    }

    /**
     * Collapses the element
     *
     * @param {event}
     * @param {element} trigger
     */
    doCollapse(event, trigger) {
        event.preventDefault();

        const target = trigger.getAttribute('data-target');
        const element = trigger.parentNode.querySelector(target);

        if (isVisible(element)) {
            hide(element, trigger);
        } else {
            show(element, trigger);
        }
    }

    /**
     * Unbinds the event listeners from the elements
     */
    unbindEvents() {
        this.listener.destroy();
    }

}

export default {
    init: element => {
        instances.push(new Collapse(element));
    },

    destroy: () => {
        instances.forEach(instance => instance.unbindEvents());
        instances = [];
    },
};
