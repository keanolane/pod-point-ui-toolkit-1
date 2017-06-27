'use strict';

var _domOps = require('@pod-point/dom-ops');

var defineSizeAndDevice = function defineSizeAndDevice() {
<<<<<<< a42ee949ff2885a0c31c3a91b89b78b867d10927
=======
    window.isTouchDevice = 'ontouchstart' in document.documentElement;
    var winWidthMedium = 800;
    window.isMobileSize = winWidth < winWidthMedium;
    var winWidth = window.innerWidth;

<<<<<<< 1c52cfddd1f08540da1d0dd7f1dbde8f7c45e1f1
>>>>>>> console log test
=======
    window.isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    window.isIE10OrBelow = navigator.userAgent.indexOf('MSIE') >= 0;

>>>>>>> Moved map image location, moved IE detection to base
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