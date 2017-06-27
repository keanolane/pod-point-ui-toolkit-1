import { addClass } from '@pod-point/dom-ops';

window.defineSizeAndDevice = () => {
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    const winWidth = window.innerWidth;
    const winWidthMedium = 800;
    window.isMobileSize = (winWidth < winWidthMedium);

    window.onload = () => {
        if (window.isTouchDevice) {
            addClass(document.body, 'is-touch');
        } else {
            addClass(document.body, 'is-desktop');
        }
    };
};
window.defineSizeAndDevice();
