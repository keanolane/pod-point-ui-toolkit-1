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
        this.toggleButton = element;
        this.toggleIcon = selectFirst('.circle-icon--toggle-panel', this.toggleButton);
        this.panel = selectFirst('#' + this.toggleButton.getAttribute('data-toggle-panel'));
        this.closeButton = selectFirst('.circle-icon--close-panel', this.panel);
        this.panelIsVisible = false;

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.toggleListener = new Delegate(this.toggleButton);

        this.toggleListener.on('click', (event) => {
            this.doPanel(event);
        });

        this.closeListener = new Delegate(this.closeButton);

        this.closeListener.on('click', (event) => {
            event.preventDefault();
            this.closePanel();
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.toggleListener.destroy();
        this.closeListener.destroy();
    }

    /**
     * Handle the panel opening.
     *
     * @param {Event} event
     */
    doPanel(event) {
        event.preventDefault();

        if (this.panelIsVisible) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    /**
     * Handle the panel opening.
     */
    openPanel() {
        this.panel.classList.remove('slide-up');
        this.panel.classList.add('slide-down');
        this.toggleIcon.classList.add('rotate');
        this.panelIsVisible = true;
    }

    /**
     * Handle the panel closing.
     */
    closePanel() {
        this.panel.classList.remove('slide-down');
        this.panel.classList.add('slide-up');
        this.toggleIcon.classList.remove('rotate');
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
