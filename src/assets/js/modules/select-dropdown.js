import { Delegate } from 'dom-delegate';
import Dropkick from 'dropkickjs';
import { insertBefore, addClass, select, nodesToArray } from '@pod-point/dom-ops';
import { isTouchDevice } from './../utilities';

const selectSelector = document.querySelectorAll('.select-dd-wrapper select');
let selectDDs = [];

class SelectDropDown {

    /**
     * Runs init functions.
     */
    constructor() {
        this.getAllSelects();
    }

    /**
     * Gets all selects and passes them to functions according to device type (desktop/touch).
     */
    getAllSelects() {
        const isTouch = isTouchDevice();
        selectDDs = nodesToArray(selectSelector);

        selectDDs.forEach(selectDD => {
            isTouch ? this.setUpTouchVerison(selectDD) : this.setUpDesktopVersion(selectDD);
        });
    }

    /**
     * For desktop: creates a new select drop down element using DropkickJS.
     */
    setUpDesktopVersion(selectDD) {
        new Dropkick(selectDD);
    }

    /**
     * For touch devices: keeps native select but adds fake select box for better styling.
     */
    setUpTouchVerison(selectDD) {
        const selectDDText = selectDD.querySelector('option[selected]').innerHTML;
        insertBefore(selectDD, '<div class="mobile-select">'+selectDDText+'</div>');
        this.bindTouchEvents(selectDD);
    }

    /**
     * Bind events for touch devices.
     */
    bindTouchEvents(selectDD) {
        const selectDDWrap = selectDD.closest('.select-dd-wrapper');
        var listener = new Delegate(selectDDWrap);

        listener.on('change', 'select', (event, element) => {
            const selectDDText = element.options[element.selectedIndex].text;
            element.closest('.select-dd-wrapper').querySelector('.mobile-select').innerHTML = selectDDText;
        })
    }
}

export default {
    init: function() {
        if (selectSelector.length) {
            new SelectDropDown();
        }
    }
};
