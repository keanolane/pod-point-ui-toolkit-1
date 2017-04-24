import { Delegate } from 'dom-delegate';
import { addClass, removeClass, nodesToArray } from '@pod-point/dom-ops';

let instances = [];

let HIDDEN = 'hidden';

class ChangeContent {

    /**
     * Creates a new content change wrapper.
     *
     * @param element
     */
    constructor(element) {
        this.wrapper = element;
        this.selectDD = this.wrapper.querySelector('select');
        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.selectListener = new Delegate(this.selectDD);

        this.selectListener.on('change', (event, element) => {
            this.changeContent(element);
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.selectListener.destroy();
    }

    /**
     * Hide/Show content.
     *
     * @param {Event} event
     */
    changeContent(element) {
        const selected = element.value;
        const allContentToShow = nodesToArray(this.wrapper.querySelectorAll('[data-content="'+selected+'"]'));
        const allContentToHide = nodesToArray(this.wrapper.querySelectorAll('[data-content]'));

        allContentToHide.forEach(item => addClass(item, HIDDEN));
        allContentToShow.forEach(item => removeClass(item, HIDDEN));
    }
}

export default {
    init: function(element) {
        instances.push(new ChangeContent(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
