import { Delegate } from 'dom-delegate';
import { selectFirst } from '@pod-point/dom-ops';

let instances = [];

let isVisible = false;

class ToggleAccordionPanel {

    /**
     * Creates a new toggle panel.
     *
     * @param element
     */
    constructor(element) {
        this.toggleButton = element;
        this.panel = selectFirst('#' + this.toggleButton.getAttribute('data-toggle-panel'));
        this.closeButton = selectFirst('.close-panel', this.panel);

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

        if (isVisible) {
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

        const icon = selectFirst('.circle-icon', this.toggleButton);
        icon.classList.add('rotate');

        isVisible = true;
    }

    /**
     * Handle the panel closing.
     */
    closePanel() {
        this.panel.classList.remove('slide-down');
        this.panel.classList.add('slide-up');

        const icon = selectFirst('.circle-icon', this.toggleButton);
        icon.classList.remove('rotate');

        isVisible = false;
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
