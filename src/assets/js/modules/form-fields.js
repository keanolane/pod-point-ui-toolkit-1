import { Delegate } from 'dom-delegate';
import { addClass, removeClass, nodesToArray, insertAfter, closest } from '@pod-point/dom-ops';

import { required, email } from './../validation-rules';
import { hide, show, isVisible } from './../utilities';

const HAS_CONTENT = 'has-content';
const HAS_ERROR = 'has-error';
const HAS_FOCUS = 'has-focus';

const errorMessages = {
    required: 'This is a required field',
    email: 'Please enter a valid email',
};

class FormFields {

    constructor(root = document.body) {
        FormFields.bindEvents(root);
        FormFields.checkAllFieldsForContent();
    }

    static checkAllFieldsForContent(wrapper = document.body) {
        const fields = nodesToArray(wrapper.querySelectorAll('input, select'));

        if (fields.length) {
            fields.forEach(field => FormFields.checkForContent(field));
        }
    }

    static checkForContent(element) {
        const container = FormFields.getInputContainer(element);
        const callback = (element.value) ? addClass : removeClass;

        callback(container, HAS_CONTENT);
    }

    static checkIfRequired(element) {
        return ((element.getAttribute('required') !== null) && isVisible(element));
    }

    static errorPlacement(element, errorElWithMessage) {
        if (element.tagName === 'SELECT') {
            insertAfter(element.parentNode, errorElWithMessage);
        } else {
            insertAfter(element, errorElWithMessage);
        }
    }

    static addErrorMessage(element, errorMessage) {
        const formFieldContainer = FormFields.getFieldContainer(element);
        const errorEl = formFieldContainer.querySelector('.form__error');

        if (errorEl === null) {
            const errorElWithMessage = `<span class="form__error">${errorMessage}</span>`;
            FormFields.errorPlacement(element, errorElWithMessage);
        } else {
            errorEl.innerHTML = errorMessage;
        }
    }

    static checkFieldForError(element) {
        if (FormFields.checkIfRequired(element)) {
            const passedValidation = required(element);

            if (passedValidation) {
                FormFields.checkSpecificValidation(element);
            } else {
                FormFields.addError(element, errorMessages.required);
            }
        }
    }

    static addError(element, errorMessage) {
        const formFieldContainer = FormFields.getFieldContainer(element);
        addClass(FormFields.getFieldContainer(element), HAS_ERROR);
        FormFields.addErrorMessage(element, errorMessage);
        show(formFieldContainer.querySelector('.form__error'));
    }

    static removeError(element) {
        const formFieldContainer = FormFields.getFieldContainer(element);
        removeClass(FormFields.getFieldContainer(element), HAS_ERROR);
        const errorEl = formFieldContainer.querySelector('.form__error');
        if (errorEl) { hide(errorEl); }
    }

    static checkSpecificValidation(element) {
        if (element.type === 'email') {
            const passedValidation = email(element);
            if (!passedValidation) {
                FormFields.addError(element, errorMessages.email);
            } else {
                FormFields.removeError(element);
            }
        } else {
            FormFields.removeError(element);
        }
    }

    static submitIfNoErrors(form) {
        const fields = nodesToArray(form.querySelectorAll('input, select'));

        if (fields.length) { fields.forEach(field => FormFields.checkFieldForError(field)); }

        const errors = nodesToArray(form.querySelectorAll('.has-error').length);
        if (errors < 1) { form.submit(); }
    }

    static bindEvents(root) {
        const listener = new Delegate(root);

        // Listen to change because of password managers etc
        listener.on('change', 'input, textarea, select', (event, element) => {
            FormFields.checkForContent(element);
            FormFields.checkFieldForError(element);
            FormFields.giveFocus(element);
        });

        // Text input focus handler
        listener.on('focus', 'input, textarea', (event, element) => FormFields.giveFocus(element));

        // Text input focusout handler
        listener.on('focusout', 'input, textarea, select', (event, element) => {
            FormFields.checkForContent(element);
            FormFields.checkFieldForError(element);
            FormFields.removeFocus(element);
        });

        listener.on('input', 'textarea', (event, element) => {
            const scrollHeight = element.scrollHeight;
            const formEl = element;

            if (scrollHeight > parseInt(window.getComputedStyle(formEl, null).height, 0)) {
                formEl.style.height = `${scrollHeight}px`;
            }
        });

        // On form submit
        listener.on('submit', 'form', (event, element) => {
            event.preventDefault();
            this.submitIfNoErrors(element);
        });
    }

    static getFieldContainer(element) {
        return closest(element, '.form__group');
    }

    static getInputContainer(element) {
        return element.parentNode;
    }

    static removeFocus(element) {
        removeClass(FormFields.getInputContainer(element), HAS_FOCUS);
    }

    static giveFocus(element) {
        addClass(FormFields.getInputContainer(element), HAS_FOCUS);
    }
}

export default {
    init: () => {
        new FormFields(); // eslint-disable-line no-new
    },
};
