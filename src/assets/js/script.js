require('./shims/classList.js');

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

dom.whenReady(() => {
    loadModules({
        formFields,
        selectDropdown,
        domModules: combineDomModules({
            modal,
            ajaxForm,
            collapse,
            dropdown,
            toggle,
        })
    });
});
