import { addClass } from '@pod-point/dom-ops';

const defineSizeAndDevice = () => {
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    const winWidthMedium = 800;
    const winWidth = window.innerWidth;
    window.isMobileSize = (winWidth < winWidthMedium);

    window.isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    window.isIE10OrBelow = navigator.userAgent.indexOf('MSIE') >= 0;

    window.onload = () => {
        if (window.isTouchDevice) {
            addClass(document.body, 'is-touch');
        } else {
            addClass(document.body, 'is-desktop');
        }
    };
};
defineSizeAndDevice();
