'use strict';

var _domOps = require('@pod-point/dom-ops');

var defineSizeAndDevice = function defineSizeAndDevice() {
<<<<<<< a42ee949ff2885a0c31c3a91b89b78b867d10927
=======
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    var winWidthMedium = 800;
    window.isMobileSize = winWidth < winWidthMedium;
    var winWidth = window.innerWidth;

>>>>>>> console log test
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
    };
};
defineSizeAndDevice();