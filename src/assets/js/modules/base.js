import { addClass } from '@pod-point/dom-ops';

class Base {

    constructor(root = document.body) {
        this.defineSizeAndDevice();
    }

    defineSizeAndDevice() {
        window.isTouchDevice = 'ontouchstart' in document.documentElement ? true : false;
        const winWidthMedium = 800;
        let winWidth = window.innerWidth;
        window.isMobileSize = (winWidth < winWidthMedium) ? true : false;
        window.onload = function() {
            isTouchDevice ? addClass(document.body, 'is-touch') : addClass(document.body, 'is-desktop');
        }
    }
}

export default {
    init: function() {
        new Base();
    }
};
