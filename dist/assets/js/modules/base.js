'use strict';

var _domOps = require('@pod-point/dom-ops');

var defineSizeAndDevice = function defineSizeAndDevice() {
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    var winWidthMedium = 800;
    window.isMobileSize = winWidth < winWidthMedium;
    var winWidth = window.innerWidth;

    window.onload = function () {
        if (window.isTouchDevice) {
            (0, _domOps.addClass)(document.body, 'is-touch');
        } else {
            (0, _domOps.addClass)(document.body, 'is-desktop');
        }
        console.log('I am updated');
    };
};
defineSizeAndDevice();