require('./shims/classList.js');
window.isTouchDevice = 'ontouchstart' in document.documentElement ? true : false;

import loadModules from '@pod-point/module-loader';
import combineDomModules from '@pod-point/dom-module-loader';
import * as dom from '@pod-point/dom-ops';

import modal from './modules/modal';
import ajaxForm from './modules/ajax-form';
import formFields from './modules/form-fields';
import collapse from './modules/collapse';
import dropdown from './modules/dropdown';
import selectDropdown from './modules/select-dropdown';
import toggle from './modules/toggle';
import gallerySimple from './modules/gallery-simple';

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
        })
    });
});
