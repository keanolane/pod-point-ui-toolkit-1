import { Delegate } from 'dom-delegate';
import { selectFirst } from '@pod-point/dom-ops';
import { isVisible, show, hide, loadVideo } from './../utilities';

let instances = [];

class Modal {

    /**
     * Creates a new modal window.
     *
     * @param element
     */
    constructor(element) {
        this.openButton = element;
        this.modal = selectFirst('#' + this.openButton.getAttribute('data-modal'));
        this.closeButton = selectFirst('.modal-close', this.modal);
        this.video = this.modal.querySelector('.video-wrapper iframe');

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.openListener = new Delegate(this.openButton);

        this.openListener.on('click', (event) => {
            this.openModal();
        });

        this.closeListener = new Delegate(this.closeButton);

        this.closeListener.on('click', (event) => {
            event.preventDefault();
            this.closeModal();
        });

        this.overlayListener = new Delegate(this.modal);

        this.overlayListener.on('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });

        this.windowListener = new Delegate(document.body);

        this.windowListener.on('keyup', (event) => {
            if (event.keyCode === 27) {
                this.closeModal();
            }
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.openListener.destroy();
        this.closeListener.destroy();
        this.overlayListener.destroy();
        this.windowListener.destroy();
    }

    /**
     * Handle the modal opening.
     *
     * @param {Event} event
     */
    doModal(event) {
        event.preventDefault();

        if (isVisible(this.modal)) {
            this.closeModal();
        } else {
            this.openModal();
        }
    }

    /**
     * Handle the modal opening.
     */
    openModal() {
        document.documentElement.classList.add('is-modal-open');

        show(this.modal);

        if (this.video) { loadVideo(this.video, true) };

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
    }

    /**
     * Handle the modal closing.
     */
    closeModal() {
        document.documentElement.classList.remove('is-modal-open');

        hide(this.modal);

        if (this.video) { loadVideo(this.video, false) };

        const overlay = selectFirst('.modal-overlay');

        if (overlay !== null) {
            document.body.removeChild(overlay);
        }
    }
}

export default {
    init: function(element) {
        instances.push(new Modal(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
