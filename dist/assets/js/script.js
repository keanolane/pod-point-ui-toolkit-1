'use strict';

var _moduleLoader = require('@pod-point/module-loader');

var _moduleLoader2 = _interopRequireDefault(_moduleLoader);

var _domModuleLoader = require('@pod-point/dom-module-loader');

var _domModuleLoader2 = _interopRequireDefault(_domModuleLoader);

var _domOps = require('@pod-point/dom-ops');

var dom = _interopRequireWildcard(_domOps);

var _modal = require('./modules/modal');

var _modal2 = _interopRequireDefault(_modal);

var _ajaxForm = require('./modules/ajax-form');

var _ajaxForm2 = _interopRequireDefault(_ajaxForm);

var _formFields = require('./modules/form-fields');

var _formFields2 = _interopRequireDefault(_formFields);

var _collapse = require('./modules/collapse');

var _collapse2 = _interopRequireDefault(_collapse);

var _dropdown = require('./modules/dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _toggle = require('./modules/toggle');

var _toggle2 = _interopRequireDefault(_toggle);

var _toggleAccordionPanel = require('./modules/toggle-accordion-panel');

var _toggleAccordionPanel2 = _interopRequireDefault(_toggleAccordionPanel);

var _toggleElement = require('./modules/toggle-element');

var _toggleElement2 = _interopRequireDefault(_toggleElement);

var _gallerySimple = require('./modules/gallery-simple');

var _gallerySimple2 = _interopRequireDefault(_gallerySimple);

var _accordion = require('./modules/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

var _headerNav = require('./modules/header-nav');

var _headerNav2 = _interopRequireDefault(_headerNav);

var _carousel = require('./modules/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _addressLookup = require('./modules/address-lookup');

var _addressLookup2 = _interopRequireDefault(_addressLookup);

var _changeContent = require('./modules/change-content');

var _changeContent2 = _interopRequireDefault(_changeContent);

var _checkoutYourPodPoint = require('./modules/checkout-your-pod-point');

var _checkoutYourPodPoint2 = _interopRequireDefault(_checkoutYourPodPoint);

var _claimOlev = require('./modules/claim-olev');

var _claimOlev2 = _interopRequireDefault(_claimOlev);

var _claimDealerDiscount = require('./modules/claim-dealer-discount');

var _claimDealerDiscount2 = _interopRequireDefault(_claimDealerDiscount);

var _basket = require('./modules/basket');

var _basket2 = _interopRequireDefault(_basket);

var _flipCounter = require('./modules/flip-counter');

var _flipCounter2 = _interopRequireDefault(_flipCounter);

var _evMap = require('./modules/ev-map');

var _evMap2 = _interopRequireDefault(_evMap);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./shims/classList.js');

window.initAutocomplete = _addressLookup.initAutocomplete;
window.geolocate = _addressLookup.geolocate;
window.fillInAddress = _addressLookup.fillInAddress;
window.handleTickInit = _flipCounter2.default.handleTickInit;

window.isTouchDevice = 'ontouchstart' in document.documentElement ? true : false;
isTouchDevice ? (0, _domOps.addClass)(document.body, 'is-touch') : (0, _domOps.addClass)(document.body, 'is-desktop');

var winWidthMedium = 800;
var winWidth = window.innerWidth;
window.isMobileSize = winWidth < winWidthMedium ? true : false;

dom.whenReady(function () {
    (0, _moduleLoader2.default)({
        formFields: _formFields2.default,
        domModules: (0, _domModuleLoader2.default)({
            modal: _modal2.default,
            ajaxForm: _ajaxForm2.default,
            collapse: _collapse2.default,
            dropdown: _dropdown2.default,
            toggle: _toggle2.default,
            toggleAccordionPanel: _toggleAccordionPanel2.default,
            toggleElement: _toggleElement2.default,
            gallerySimple: _gallerySimple2.default,
            headerNav: _headerNav2.default,
            accordion: _accordion2.default,
            carousel: _carousel2.default,
            addressLookup: _addressLookup2.default,
            changeContent: _changeContent2.default,
            checkoutYourPodPoint: _checkoutYourPodPoint2.default,
            claimOlev: _claimOlev2.default,
            claimDealerDiscount: _claimDealerDiscount2.default,
            basket: _basket2.default,
            flipCounter: _flipCounter2.default,
            evMap: _evMap2.default
        })
    });
});

function debounce(callback, wait) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    var timeout = null;
    var callbackArgs = null;
    var later = function later() {
        return callback.apply(context, callbackArgs);
    };

    return function () {
        callbackArgs = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
var handleResize = debounce(function (e) {
    (0, _moduleLoader2.default)();
}, 100);

window.addEventListener('resize', handleResize);