import loadModules from '@pod-point/module-loader';
import combineDomModules from '@pod-point/dom-module-loader';
import * as dom from '@pod-point/dom-ops';

import base from './modules/base';
import modal from './modules/modal';
import ajaxForm from './modules/ajax-form';
import formFields from './modules/form-fields';
import collapse from './modules/collapse';
import dropdown from './modules/dropdown';
import toggle from './modules/toggle';
import toggleAccordionPanel from './modules/toggle-accordion-panel';
import toggleElement from './modules/toggle-element';
import gallerySimple from './modules/gallery-simple';
import accordion from './modules/accordion';
import headerNav from './modules/header-nav';
import carousel from './modules/carousel';
import changeContent from './modules/change-content';
import checkoutYourPodPoint from './modules/checkout-your-pod-point';
import claimOlev from './modules/claim-olev';
import claimDealerDiscount from './modules/claim-dealer-discount';
import basket from './modules/basket';
import flipCounter from './modules/flip-counter';
import evMap from './modules/ev-map';
import * as addressLookup from './modules/address-lookup';

require('./shims/classList.js');

window.initAutocomplete = addressLookup.initAutocomplete;
window.geolocate = addressLookup.geolocate;
window.fillInAddress = addressLookup.fillInAddress;

dom.whenReady(() => {
    loadModules({
        base,
        formFields,
        domModules: combineDomModules({
            modal,
            ajaxForm,
            collapse,
            dropdown,
            toggle,
            toggleAccordionPanel,
            toggleElement,
            gallerySimple,
            headerNav,
            accordion,
            carousel,
            addressLookup,
            changeContent,
            checkoutYourPodPoint,
            claimOlev,
            claimDealerDiscount,
            basket,
            flipCounter,
            evMap,
        }),
    });
});

// function debounce(callback, wait, context = this) {
//     let timeout = null;
//     let callbackArgs = null;
//     const later = () => callback.apply(context, callbackArgs);

//     return () => {
//         callbackArgs = arguments;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//     };
// }
// const handleResize = debounce((e) => {
//     loadModules();
// }, 100);

// window.addEventListener('resize', handleResize)

