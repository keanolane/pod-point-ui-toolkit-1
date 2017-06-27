'use strict';

var _domOps = require('@pod-point/dom-ops');

var defineSizeAndDevice = function defineSizeAndDevice() {
    window.onload = function () {
        window.isTouchDevice = 'ontouchstart' in document.documentElement;
        var winWidthMedium = 800;
        window.isMobileSize = winWidth < winWidthMedium;
        var winWidth = window.innerWidth;
        var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
        var isIE10 = document.body.style.msTouchAction != undefined;
        if (window.isTouchDevice) {
            (0, _domOps.addClass)(document.body, 'is-touch');
        } else {
            (0, _domOps.addClass)(document.body, 'is-desktop');
        }
        if (isIE11 || isIE10) {
            (0, _domOps.addClass)(document.documentElement, 'ie');
        }
    };
};

defineSizeAndDevice();