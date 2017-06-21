'use strict';

var _domOps = require('@pod-point/dom-ops');

var defineSizeAndDevice = function defineSizeAndDevice() {
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    var winWidthMedium = 800;
    var winWidth = window.innerWidth;
    window.isMobileSize = winWidth < winWidthMedium;
    window.onload = function () {
        window.isTouchDevice ? (0, _domOps.addClass)(document.body, 'is-touch') : (0, _domOps.addClass)(document.body, 'is-desktop');
    };
};

defineSizeAndDevice();