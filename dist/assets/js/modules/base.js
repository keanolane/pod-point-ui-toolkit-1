'use strict';

var _domOps = require('@pod-point/dom-ops');

window.defineSizeAndDevice = function () {
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    var winWidth = window.innerWidth;
    var winWidthMedium = 800;
    window.isMobileSize = winWidth < winWidthMedium;

    window.onload = function () {
        if (window.isTouchDevice) {
            (0, _domOps.addClass)(document.body, 'is-touch');
        } else {
            (0, _domOps.addClass)(document.body, 'is-desktop');
        }
    };
};
window.defineSizeAndDevice();