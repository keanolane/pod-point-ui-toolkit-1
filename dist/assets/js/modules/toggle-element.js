'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];
var IS_OPEN = 'fade-in';

var ToggleElement = function () {

    /**
     * Creates a new toggle element.
     *
     * @param element
     */
    function ToggleElement(element) {
        _classCallCheck(this, ToggleElement);

        this.element = element;
        this.elementId = element.getAttribute('id');
        this.toggleButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-toggle-el="' + this.elementId + '"]')) || [];
        this.openButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-open-el="' + this.elementId + '"]')) || [];
        this.closeButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-close-el="' + this.elementId + '"]')) || [];

        this.elementIsVisible = false;

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(ToggleElement, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.toggleListeners = [];
            this.toggleButtons.forEach(function (toggleButton) {
                var toggleListener = new _domDelegate.Delegate(toggleButton);
                _this.toggleListeners.push(toggleListener);
                toggleListener.on('click', function (event) {
                    event.preventDefault();
                    _this.toggleElement();
                });
            });

            this.openListeners = [];
            this.openButtons.forEach(function (openButton) {
                var openListener = new _domDelegate.Delegate(openButton);
                _this.openListeners.push(openListener);
                openListener.on('click', function (event) {
                    event.preventDefault();
                    _this.openElement();
                });
            });

            this.closeListeners = [];
            this.closeButtons.forEach(function (closeButton) {
                var closeListener = new _domDelegate.Delegate(closeButton);
                _this.closeListeners.push(closeListener);
                closeListener.on('click', function (event) {
                    event.preventDefault();
                    _this.closeElement();
                });
            });
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.toggleListeners.forEach(function (toggleListener) {
                return toggleListener.destroy();
            });
            this.openListeners.forEach(function (openListener) {
                return openListener.destroy();
            });
            this.closeListeners.forEach(function (closeListener) {
                return closeListener.destroy();
            });
        }

        /**
         * Toggle element depending if already open or not.
         */

    }, {
        key: 'toggleElement',
        value: function toggleElement() {
            if (this.elementIsVisible) {
                this.closeElement();
            } else {
                this.openElement();
            }
        }

        /**
         * Handle the element opening.
         */

    }, {
        key: 'openElement',
        value: function openElement() {
            this.element.classList.remove('hidden');
            this.element.classList.add(IS_OPEN);
            this.elementIsVisible = true;
        }

        /**
         * Handle the element closing.
         */

    }, {
        key: 'closeElement',
        value: function closeElement() {
            this.element.classList.add('hidden');
            this.element.classList.remove(IS_OPEN);
            this.elementIsVisible = false;
        }
    }]);

    return ToggleElement;
}();

exports.default = {
    init: function init(element) {
        instances.push(new ToggleElement(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};