import { addClass } from '@pod-point/dom-ops';

const defineSizeAndDevice = () => {
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    const winWidthMedium = 800;
    const winWidth = window.innerWidth;
    window.isMobileSize = (winWidth < winWidthMedium);
    window.onload = () => {
        window.isTouchDevice ? addClass(document.body, 'is-touch') : addClass(document.body, 'is-desktop');
    };
};

defineSizeAndDevice();
