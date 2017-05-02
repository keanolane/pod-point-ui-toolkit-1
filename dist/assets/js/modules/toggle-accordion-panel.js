'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];
var IS_OPEN = 'is-open';

var ToggleAccordionPanel = function () {

    /**
     * Creates a new toggle panel.
     *
     * @param element
     */
    function ToggleAccordionPanel(element) {
        _classCallCheck(this, ToggleAccordionPanel);

        this.panel = element;
        this.panelId = element.getAttribute('id');
        this.toggleIcon = document.querySelector('[data-toggle-icon="' + this.panelId + '"]');
        this.toggleButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-toggle-panel="' + this.panelId + '"]')) || [];
        this.openButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-open-panel="' + this.panelId + '"]')) || [];
        this.closeButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-close-panel="' + this.panelId + '"]')) || [];
        this.radioOpenButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-radio-open-panel="' + this.panelId + '"]')) || [];
        this.radioCloseButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-radio-close-panel="' + this.panelId + '"]')) || [];
        this.inputOpenButtons = (0, _domOps.nodesToArray)(document.querySelectorAll('[data-input-open-panel="' + this.panelId + '"]')) || [];

        this.panelIsVisible = false;

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(ToggleAccordionPanel, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.toggleListeners = [];
            this.toggleButtons.forEach(function (toggleButton) {
                var toggleListener = new _domDelegate.Delegate(toggleButton);
                _this.toggleListeners.push(toggleListener);
                toggleListener.on('click', function (event) {
                    event.preventDefault();
                    _this.togglePanel();
                });
            });

            this.openListeners = [];
            this.openButtons.forEach(function (openButton) {
                var openListener = new _domDelegate.Delegate(openButton);
                _this.openListeners.push(openListener);
                openListener.on('click', function (event) {
                    event.preventDefault();
                    _this.openPanel();
                });
            });

            this.closeListeners = [];
            this.closeButtons.forEach(function (closeButton) {
                var closeListener = new _domDelegate.Delegate(closeButton);
                _this.closeListeners.push(closeListener);
                closeListener.on('click', function (event) {
                    event.preventDefault();
                    _this.closePanel();
                });
            });

            this.radioOpenListeners = [];
            this.radioOpenButtons.forEach(function (radioOpenButton) {
                var radioOpenListener = new _domDelegate.Delegate(radioOpenButton);
                _this.radioOpenListeners.push(radioOpenListener);
                radioOpenListener.on('change', function (event) {
                    event.preventDefault();
                    _this.openPanel();
                });
            });

            this.radioCloseListeners = [];
            this.radioCloseButtons.forEach(function (radioCloseButton) {
                var radioCloseListener = new _domDelegate.Delegate(radioCloseButton);
                _this.radioCloseListeners.push(radioCloseListener);
                radioCloseListener.on('change', function (event) {
                    event.preventDefault();
                    _this.closePanel();
                });
            });

            this.inputOpenListeners = [];
            this.inputOpenButtons.forEach(function (inputOpenButton) {
                var inputOpenListener = new _domDelegate.Delegate(inputOpenButton);
                _this.inputOpenListeners.push(inputOpenListener);
                inputOpenListener.on('focus', function () {
                    return _this.openPanel();
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
            this.radioOpenListeners.forEach(function (radioOpenListener) {
                return radioOpenListener.destroy();
            });
            this.radioCloseListeners.forEach(function (radioCloseListener) {
                return radioCloseListener.destroy();
            });
            this.inputOpenListeners.forEach(function (inputOpenListener) {
                return inputOpenListener.destroy();
            });
        }

        /**
         * Toggle panel depending if already open or not.
         */

    }, {
        key: 'togglePanel',
        value: function togglePanel() {
            if (this.panelIsVisible) {
                this.closePanel();
            } else {
                this.openPanel();
            }
        }

        /**
         * Handle the panel opening.
         */

    }, {
        key: 'openPanel',
        value: function openPanel() {
            this.panel.classList.add(IS_OPEN);
            if (this.toggleIcon) {
                this.toggleIcon.classList.add('rotate');
            }
            this.panelIsVisible = true;
        }

        /**
         * Handle the panel closing.
         */

    }, {
        key: 'closePanel',
        value: function closePanel() {
            this.panel.classList.remove(IS_OPEN);
            if (this.toggleIcon) {
                this.toggleIcon.classList.remove('rotate');
            }
            this.panelIsVisible = false;
        }
    }]);

    return ToggleAccordionPanel;
}();

exports.default = {
    init: function init(element) {
        instances.push(new ToggleAccordionPanel(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};