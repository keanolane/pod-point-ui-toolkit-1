import { addClass } from '@pod-point/dom-ops';

const defineSizeAndDevice = () => {
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    const winWidthMedium = 800;
    window.isMobileSize = (winWidth < winWidthMedium);
    const winWidth = window.innerWidth;

    window.onload = () => {
        if (window.isTouchDevice) {
            addClass(document.body, 'is-touch');
        } else {
            addClass(document.body, 'is-desktop');
        }
    };
};

defineSizeAndDevice();
