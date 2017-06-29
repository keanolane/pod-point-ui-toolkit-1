'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

var _validationRules = require('./../validation-rules');

var _utilities = require('./../utilities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HAS_CONTENT = 'has-content';
var HAS_ERROR = 'has-error';
var HAS_FOCUS = 'has-focus';

var errorMessages = {
    required: "This is a required field",
    email: "Please enter a valid email"
};

var FormFields = function () {
    function FormFields() {
        var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

        _classCallCheck(this, FormFields);

        FormFields.bindEvents(root);
        FormFields.checkAllFieldsForContent();
    }

    _createClass(FormFields, null, [{
        key: 'checkAllFieldsForContent',
        value: function checkAllFieldsForContent() {
            var wrapper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

            var fields = (0, _domOps.nodesToArray)(wrapper.querySelectorAll('input, select'));

            if (fields.length) {
                fields.forEach(function (field) {
                    return FormFields.checkForContent(field);
                });
            }
        }
    }, {
        key: 'checkForContent',
        value: function checkForContent(element) {
            var container = FormFields.getInputContainer(element);
            var callback = element.value ? _domOps.addClass : _domOps.removeClass;

            callback(container, HAS_CONTENT);
        }
    }, {
        key: 'checkIfRequired',
        value: function checkIfRequired(element) {
            return element.getAttribute('required') !== null && (0, _utilities.isVisible)(element);
        }
    }, {
        key: 'errorPlacement',
        value: function errorPlacement(element, errorElWithMessage) {
            if (element.tagName === 'SELECT') {
                (0, _domOps.insertAfter)(element.parentNode, errorElWithMessage);
            } else {
                (0, _domOps.insertAfter)(element, errorElWithMessage);
            }
        }
    }, {
        key: 'addErrorMessage',
        value: function addErrorMessage(element, errorMessage) {
            var formFieldContainer = FormFields.getFieldContainer(element);
            var errorEl = formFieldContainer.querySelector('.form__error');

            if (errorEl === null) {
                var errorElWithMessage = '<span class="form__error">' + errorMessage + '</span>';
                FormFields.errorPlacement(element, errorElWithMessage);
            } else {
                errorEl.innerHTML = errorMessage;
            }
        }
    }, {
        key: 'checkFieldForError',
        value: function checkFieldForError(element) {
            if (FormFields.checkIfRequired(element)) {
                var passedValidation = (0, _validationRules.required)(element);

                if (passedValidation) {
                    FormFields.checkSpecificValidation(element);
                } else {
                    FormFields.addError(element, errorMessages.required);
                }
            }
        }
    }, {
        key: 'addError',
        value: function addError(element, errorMessage) {
            var formFieldContainer = FormFields.getFieldContainer(element);
            (0, _domOps.addClass)(FormFields.getFieldContainer(element), HAS_ERROR);
            FormFields.addErrorMessage(element, errorMessage);
            (0, _utilities.show)(formFieldContainer.querySelector('.form__error'));
        }
    }, {
        key: 'removeError',
        value: function removeError(element) {
            var formFieldContainer = FormFields.getFieldContainer(element);
            (0, _domOps.removeClass)(FormFields.getFieldContainer(element), HAS_ERROR);
            var errorEl = formFieldContainer.querySelector('.form__error');
            if (errorEl) {
                (0, _utilities.hide)(errorEl);
            }
        }
    }, {
        key: 'checkSpecificValidation',
        value: function checkSpecificValidation(element) {
            if (element.type === 'email') {
                var passedValidation = (0, _validationRules.email)(element);
                if (!passedValidation) {
                    FormFields.addError(element, errorMessages.email);
                } else {
                    FormFields.removeError(element);
                }
            } else {
                FormFields.removeError(element);
            }
        }
    }, {
        key: 'submitIfNoErrors',
        value: function submitIfNoErrors(form) {
            var fields = (0, _domOps.nodesToArray)(form.querySelectorAll('input, select'));

            if (fields.length) {
                fields.forEach(function (field) {
                    return FormFields.checkFieldForError(field);
                });
            }

            var errors = (0, _domOps.nodesToArray)(form.querySelectorAll('.has-error').length);
            if (errors < 1) {
                form.submit();
            }
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents(root) {
            var _this = this;

            var listener = new _domDelegate.Delegate(root);

            // Listen to change because of password managers etc
            listener.on('change', 'input, textarea, select', function (event, element) {
                FormFields.checkForContent(element);
                FormFields.checkFieldForError(element);
                FormFields.giveFocus(element);
            });

            // Text input focus handler
            listener.on('focus', 'input, textarea', function (event, element) {
                return FormFields.giveFocus(element);
            });

            // Text input focusout handler
            listener.on('focusout', 'input, textarea, select', function (event, element) {
                FormFields.checkForContent(element);
                FormFields.checkFieldForError(element);
                FormFields.removeFocus(element);
            });

            listener.on('input', 'textarea', function (event, element) {
                var scrollHeight = element.scrollHeight;
                var formEl = element;

                if (scrollHeight > parseInt(window.getComputedStyle(formEl, null).height, 0)) {
                    formEl.style.height = scrollHeight + 'px';
                }
            });

            // On form submit
            listener.on('submit', 'form', function (event, element) {
                event.preventDefault();
                _this.submitIfNoErrors(element);
            });
        }
    }, {
        key: 'getFieldContainer',
        value: function getFieldContainer(element) {
            return (0, _domOps.closest)(element, '.form__group');
        }
    }, {
        key: 'getInputContainer',
        value: function getInputContainer(element) {
            return element.parentNode;
        }
    }, {
        key: 'removeFocus',
        value: function removeFocus(element) {
            (0, _domOps.removeClass)(FormFields.getInputContainer(element), HAS_FOCUS);
        }
    }, {
        key: 'giveFocus',
        value: function giveFocus(element) {
            (0, _domOps.addClass)(FormFields.getInputContainer(element), HAS_FOCUS);
        }
    }]);

    return FormFields;
}();

exports.default = {
    init: function init() {
        new FormFields(); // eslint-disable-line no-new
    }
};