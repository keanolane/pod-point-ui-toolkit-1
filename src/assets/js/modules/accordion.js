import { Delegate } from 'dom-delegate';
import { addClass, removeClass, nodesToArray, hasClass } from '@pod-point/dom-ops';

let instances = [];

const IS_OPEN = 'is-open';
const MOBILE_ONLY = 'accordion--only-mobile';

class Accordion {

    /**
     * Creates a new accordion element.
     *
     * @param element
     */
    constructor(element) {
        console.log(element);
        this.element = element;
        this.mobileOrDesktop();
    }

    /**
     * Checks if mobile or desktop.
     *
     */
    mobileOrDesktop() {
        if ((hasClass(this.element, MOBILE_ONLY) && isMobileSize) || (hasClass(this.element, MOBILE_ONLY) != true))
            this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.listener = new Delegate(this.element);

        this.listener.on('click', 'dt', (event, element) => {
            this.toggleAccordion(event, element);
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.listener.destroy();
    }

    /**
     * Toggles the accordion.
     *
     * @param {Event} event
     * @param {Element} element
     */
    toggleAccordion(event, element) {
        if (hasClass(element, IS_OPEN)) {
            removeClass(element, IS_OPEN);
        } else {
            const allDtEls = nodesToArray(this.element.querySelectorAll('dt'));
            allDtEls.forEach(dt => removeClass(dt, IS_OPEN));
            addClass(element.closest('dt'), IS_OPEN);
        }
    }
}

export default {
    init: function(element) {
        instances.push(new Accordion(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
