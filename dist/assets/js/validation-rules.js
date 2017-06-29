'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.required = required;
exports.email = email;

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

var errorMessages = {
    required: "This is a required field"
};

/**
 * Rule for required fields
 *
 * @param {element}
 * @return {boolean} passes validation
 */
function required(element) {
    return element.value === '' ? false : true;
}

/**
 * Rule for email fields
 *
 * @param {element}
 * @return {boolean} passes validation
 */
function email(element) {
    var re = /(\w+)\@(\w+)\.[a-zA-Z]/g;
    var emailValue = element.value;
    return re.test(emailValue);
}