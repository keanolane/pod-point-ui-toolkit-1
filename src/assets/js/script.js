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
import gallerySimple from './modules/gallery-simple';
import headerNav from './modules/header-nav';

window.isTouchDevice = 'ontouchstart' in document.documentElement ? true : false;
isTouchDevice ? addClass(document.body, 'is-touch') : addClass(document.body, 'is-desktop')

dom.whenReady(() => {
    loadModules({
        formFields,
        domModules: combineDomModules({
            modal,
            ajaxForm,
            collapse,
            dropdown,
            toggle,
            selectDropdown,
            gallerySimple,
            headerNav,
        })
    });
});
