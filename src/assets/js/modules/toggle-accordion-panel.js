import { Delegate } from 'dom-delegate';
import { selectFirst } from '@pod-point/dom-ops';

let instances = [];

class ToggleAccordionPanel {

    /**
     * Creates a new toggle panel.
     *
     * @param element
     */
    constructor(element) {
        this.panel = element;
        this.panelId = element.getAttribute('id');
        this.toggleButton = document.querySelector('[data-toggle-panel="'+this.panelId+'"]');
        if (this.toggleButton) { this.toggleIcon = this.toggleButton.querySelector('.toggle-rotate-icon') };
        this.openButton = document.querySelector('[data-open-panel="'+this.panelId+'"]');
        this.closeButton = document.querySelector('[data-close-panel="'+this.panelId+'"]');
        this.openRadioButton = document.querySelector('[data-radio-open-panel="'+this.panelId+'"]');
        this.closeRadioButton = document.querySelector('[data-radio-close-panel="'+this.panelId+'"]');
        this.openInputButton = document.querySelector('[data-input-open-panel="'+this.panelId+'"]');

        this.panelIsVisible = false;

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.openListener = new Delegate(this.openButton);
        this.openListener.on('click', (event) => {
            event.preventDefault();
            this.openPanel();
        });

        this.closeListener = new Delegate(this.closeButton);
        this.closeListener.on('click', (event) => {
            event.preventDefault();
            this.closePanel();
        });

        this.radioOpenListener = new Delegate(this.openRadioButton);
        this.radioOpenListener.on('change', () => {
            this.openPanel();
        });

        this.radioCloseListener = new Delegate(this.closeRadioButton);
        this.radioCloseListener.on('change', () => {
            this.closePanel();
        });

        this.inputOpenListener = new Delegate(this.openInputButton);
        this.inputOpenListener.on('focus', () => {
            this.openPanel();
        });

        this.toggleListener = new Delegate(this.toggleButton);
        this.toggleListener.on('click', (event) => {
            this.doPanel(event);
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.toggleListener.destroy();
        this.openListener.destroy();
        this.closeListener.destroy();
        this.radioOpenListener.destroy();
        this.radioCloseListener.destroy();
        this.inputOpenListener.destroy();
    }

    /**
     * Handle the panel opening.
     *
     * @param {Event} event
     */
    doPanel(event) {
        if (this.panelIsVisible) {
            this.closePanel(event);
        } else {
            this.openPanel(event);
        }
    }

    /**
     * Handle the panel opening.
     *
     */
    openPanel() {
        this.panel.classList.remove('slide-up');
        this.panel.classList.add('slide-down');
        if (this.toggleIcon) { this.toggleIcon.classList.add('rotate'); }
        this.panelIsVisible = true;
    }

    /**
     * Handle the panel closing.
     *
     */
    closePanel() {
        this.panel.classList.remove('slide-down');
        this.panel.classList.add('slide-up');
        if (this.toggleIcon) { this.toggleIcon.classList.remove('rotate'); }
        this.panelIsVisible = false;
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
