import { Delegate } from 'dom-delegate';
import { nodesToArray, hasClass, addClass, removeClass } from '@pod-point/dom-ops';
import { openPanel, closePanel } from './../utilities';

let instances = [];
const IS_OPEN = 'is-open';

class ToggleAccordionPanel {

    /**
     * Creates a new toggle panel.
     *
     * @param element
     */
    constructor(element) {
        this.panel = element;
        this.panelId = element.getAttribute('id');
        this.toggleIcon = document.querySelector('[data-toggle-icon="'+this.panelId+'"]')
        this.toggleButtons = nodesToArray(document.querySelectorAll('[data-toggle-panel="'+this.panelId+'"]')) || [];
        this.openButtons = nodesToArray(document.querySelectorAll('[data-open-panel="'+this.panelId+'"]')) || [];
        this.closeButtons = nodesToArray(document.querySelectorAll('[data-close-panel="'+this.panelId+'"]')) || [];
        this.radioOpenButtons = nodesToArray(document.querySelectorAll('[data-radio-open-panel="'+this.panelId+'"]')) || [];
        this.radioCloseButtons = nodesToArray(document.querySelectorAll('[data-radio-close-panel="'+this.panelId+'"]')) || [];
        this.inputOpenButtons = nodesToArray(document.querySelectorAll('[data-input-open-panel="'+this.panelId+'"]')) || [];

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
                this.togglePanel();
            });
        });

        this.openListeners = [];
        this.openButtons.forEach(openButton => {
            const openListener = new Delegate(openButton);
            this.openListeners.push(openListener);
            openListener.on('click', (event) => {
                event.preventDefault();
                openPanel(this.panel);
            });
        });

        this.closeListeners = [];
        this.closeButtons.forEach(closeButton => {
            const closeListener = new Delegate(closeButton);
            this.closeListeners.push(closeListener);
            closeListener.on('click', (event) => {
                event.preventDefault();
                closePanel(this.panel);
            });
        });

        this.radioOpenListeners = [];
        this.radioOpenButtons.forEach(radioOpenButton => {
            const radioOpenListener = new Delegate(radioOpenButton);
            this.radioOpenListeners.push(radioOpenListener);
            radioOpenListener.on('change', (event) => {
                event.preventDefault();
               openPanel(this.panel);
            });
        });

        this.radioCloseListeners = [];
        this.radioCloseButtons.forEach(radioCloseButton => {
            const radioCloseListener = new Delegate(radioCloseButton);
            this.radioCloseListeners.push(radioCloseListener);
            radioCloseListener.on('change', (event) => {
                event.preventDefault();
                closePanel(this.panel);
            });
        });

        this.inputOpenListeners = [];
        this.inputOpenButtons.forEach(inputOpenButton => {
            const inputOpenListener = new Delegate(inputOpenButton);
            this.inputOpenListeners.push(inputOpenListener);
            inputOpenListener.on('focus', () => openPanel(this.panel));
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.toggleListeners.forEach(toggleListener => toggleListener.destroy());
        this.openListeners.forEach(openListener => openListener.destroy());
        this.closeListeners.forEach(closeListener => closeListener.destroy());
        this.radioOpenListeners.forEach(radioOpenListener => radioOpenListener.destroy());
        this.radioCloseListeners.forEach(radioCloseListener => radioCloseListener.destroy());
        this.inputOpenListeners.forEach(inputOpenListener => inputOpenListener.destroy());
    }

    /**
     * Toggle panel depending if already open or not.
     */
    togglePanel() {
        const panelIsVisible = hasClass(this.panel, IS_OPEN);

        if (panelIsVisible) {
            closePanel(this.panel);
        } else {
            openPanel(this.panel);
        }
    }
}

export default {
    init: function(element) {
        instances.push(new ToggleAccordionPanel(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
