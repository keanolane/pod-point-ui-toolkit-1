import { Delegate } from 'dom-delegate';
import { nodesToArray } from '@pod-point/dom-ops';

let instances = [];
let anElementIsOpen = false;
const IS_OPEN = 'fade-in';

class ToggleElement {

    /**
     * Creates a new toggle element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;
        this.elementId = element.getAttribute('id');
        this.toggleButtons = nodesToArray(document.querySelectorAll('[data-toggle-el="'+this.elementId+'"]')) || [];
        this.openButtons = nodesToArray(document.querySelectorAll('[data-open-el="'+this.elementId+'"]')) || [];
        this.closeButtons = nodesToArray(document.querySelectorAll('[data-close-el="'+this.elementId+'"]')) || [];

        this.allElements = nodesToArray(document.querySelectorAll('[data-js-module="toggleElement"]'));

        this.elementIsVisible = false;

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.toggleListeners = [];
        this.toggleButtons.forEach(toggleButton => {
            const toggleListener = new Delegate(toggleButton);
            this.toggleListeners.push(toggleListener);
            toggleListener.on('click', (event) => {
                event.preventDefault();
                this.toggleElement();
            });
        });

        this.openListeners = [];
        this.openButtons.forEach(openButton => {
            const openListener = new Delegate(openButton);
            this.openListeners.push(openListener);
            openListener.on('click', (event) => {
                event.preventDefault();
                this.openElement();
            });
        });

        this.closeListeners = [];
        this.closeButtons.forEach(closeButton => {
            const closeListener = new Delegate(closeButton);
            this.closeListeners.push(closeListener);
            closeListener.on('click', (event) => {
                event.preventDefault();
                this.closeElement();
            });
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.toggleListeners.forEach(toggleListener => toggleListener.destroy());
        this.openListeners.forEach(openListener => openListener.destroy());
        this.closeListeners.forEach(closeListener => closeListener.destroy());
    }

    /**
     * Toggle element depending if already open or not.
     */
    toggleElement() {
        if (this.elementIsVisible) {
            this.closeElement();
        } else {
            this.openElement();
        }
    }

    /**
     * Handle the element opening.
     */
    openElement() {
        this.closeAllElements();
        anElementIsOpen = true;
        this.elementIsVisible = true;
        this.element.classList.remove('hidden');
        this.element.classList.add(IS_OPEN);
    }

    /**
     * Handle the element closing.
     */
    closeElement() {
        this.element.classList.add('hidden');
        this.element.classList.remove(IS_OPEN);
        this.elementIsVisible = false;
    }

    /**
     * Handle the closing of all other elements.
     */
    closeAllElements() {
        this.allElements.forEach(el => {
            el.classList.add('hidden');
            el.classList.remove(IS_OPEN);
        });
        this.elementIsVisible = false;
    }
}

export default {
    init: function(element) {
        instances.push(new ToggleElement(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
