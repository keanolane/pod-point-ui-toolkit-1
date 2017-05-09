require('./shims/classList.js');

import loadModules from '@pod-point/module-loader';
import combineDomModules from '@pod-point/dom-module-loader';
import * as dom from '@pod-point/dom-ops';
import {addClass} from '@pod-point/dom-ops';

import modal from './modules/modal';
import ajaxForm from './modules/ajax-form';
import formFields from './modules/form-fields';
import collapse from './modules/collapse';
import dropdown from './modules/dropdown';
import selectDropdown from './modules/select-dropdown';
import toggle from './modules/toggle';
import toggleAccordionPanel from './modules/toggle-accordion-panel';
import toggleElement from './modules/toggle-element';
import gallerySimple from './modules/gallery-simple';
import accordion from './modules/accordion';
import headerNav from './modules/header-nav';
import carousel from './modules/Carousel';
import addressLookup from './modules/address-lookup';
import changeContent from './modules/change-content';
import checkoutYourPodPoint from './modules/checkout-your-pod-point';
import claimOlev from './modules/claim-olev';
import claimDealerDiscount from './modules/claim-dealer-discount';
import basket from './modules/basket';


import { initAutocomplete, geolocate, fillInAddress } from './modules/address-lookup';

window.initAutocomplete = initAutocomplete;
window.geolocate = geolocate;
window.fillInAddress = fillInAddress;

window.isTouchDevice = 'ontouchstart' in document.documentElement ? true : false;
isTouchDevice ? addClass(document.body, 'is-touch') : addClass(document.body, 'is-desktop')

const winWidthMedium = 800;
let winWidth = window.innerWidth;
window.isMobileSize = (winWidth < winWidthMedium) ? true : false;

dom.whenReady(() => {
    loadModules({
        formFields,
        domModules: combineDomModules({
            modal,
            ajaxForm,
            collapse,
            dropdown,
            toggle,
            toggleAccordionPanel,
            toggleElement,
            selectDropdown,
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
        })
    });
});