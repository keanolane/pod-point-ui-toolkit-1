import { addClass } from '@pod-point/dom-ops';

const defineSizeAndDevice = () => {
    window.onload = () => {
        window.isTouchDevice = 'ontouchstart' in document.documentElement;
        const winWidthMedium = 800;
        window.isMobileSize = (winWidth < winWidthMedium);
        const winWidth = window.innerWidth;
        const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
        const isIE10 = document.body.style.msTouchAction != undefined;
        if (window.isTouchDevice) {
            addClass(document.body, 'is-touch');
        } else {
            addClass(document.body, 'is-desktop');
        }
        if (isIE11 || isIE10) {
            addClass(document.documentElement, 'ie');
        }
    };
};

defineSizeAndDevice();
