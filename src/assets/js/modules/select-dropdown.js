import { Delegate } from 'dom-delegate';
import Dropkick from 'dropkickjs';
import { insertAfter, addClass, select, nodesToArray } from '@pod-point/dom-ops';

let instances = [];

const SELECT_WRAP_MOBILE = 'select-dd-wrapper--mobile';

class SelectDropDown {

    /**
     * Create a new select dropdown element.
     *
     * @param select wrapper
     */
    constructor(element) {
        this.element = element;
        isTouchDevice ? this.setUpTouchVerison() : this.setUpDesktopVersion();
    }

    /**
     * For desktop: creates a new select drop down element using DropkickJS.
     */
    setUpDesktopVersion() {
        const selectDD = this.element.querySelector('select');
        new Dropkick(selectDD);
    }

    /**
     * For touch devices: keeps native select but adds fake select box for better styling.
     */
    setUpTouchVerison() {
        const select = this.element.querySelector('select');
        const selectDDText = this.element.querySelector('option[selected]').innerHTML;
        addClass(this.element, SELECT_WRAP_MOBILE);
        insertAfter(select, '<div class="mobile-select">'+selectDDText+'</div>');
        this.bindTouchEvents();
    }

    /**
     * Bind events for touch devices.
     */
    bindTouchEvents() {
        const selectDDWrap = this.element.closest('.select-dd-wrapper');
        var listener = new Delegate(selectDDWrap);

        listener.on('change', 'select', (event, element) => {
            const selectDDText = element.options[element.selectedIndex].text;
            element.closest('.select-dd-wrapper').querySelector('.mobile-select').innerHTML = selectDDText;
        })
    }
}

export default {
    init: function(element) {
        instances.push(new SelectDropDown(element));
    }
};
