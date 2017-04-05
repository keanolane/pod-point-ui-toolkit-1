import { Delegate } from 'dom-delegate';
import { selectFirst } from '@pod-point/dom-ops';
import { isVisible, hide, show } from './../utilities';

let instances = [];

const LOCAL_KEY = 'toggle-state-';
const HIDDEN = 'hidden';
const VISIBLE = 'visible';

class Toggle {

    /**
     * Creates a new toggle element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;
        this.action = element.dataset.hasOwnProperty('action') ? element.dataset.action : 'click';

        this.shouldHide = element.getAttribute('data-hide');
        this.shouldShow = element.getAttribute('data-show') ? element.dataset.show : null;

        this.storageKey = null;

        if (element.getAttribute('data-persist')) {
            this.storageKey = LOCAL_KEY + element.getAttribute('id');

            this.initialVisibility = localStorage.getItem(this.storageKey);

            if (this.initialVisibility === HIDDEN) {
                hide(selectFirst(this.shouldHide));
            } else {
                show(selectFirst(this.shouldHide));
            }
        }

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.listener = new Delegate(this.element);

        this.listener.on(this.action, (event) => {
            this.doToggle(event);
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.listener.destroy();
    }

    /**
     * Toggles the elements.
     *
     * @param {Event} event
     */
    doToggle(event) {
        event.preventDefault();

        let hideElement = this.shouldHide ? selectFirst(this.shouldHide) : null;
        let showElement = this.shouldShow ? selectFirst(this.shouldShow) : null;

        if (this.storageKey) {
            localStorage.setItem(this.storageKey, isVisible(hideElement) ? HIDDEN : VISIBLE);
        }

        if (this.shouldShow) {
            if (isVisible(showElement)) {
                hide(showElement);
            } else {
                show(showElement);
            }
        }

        if (this.shouldHide) {
            if (isVisible(hideElement)) {
                hide(hideElement);
            } else {
                show(hideElement);
            }
        }
    }
}

export default {
    init: function(element) {
        instances.push(new Toggle(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
