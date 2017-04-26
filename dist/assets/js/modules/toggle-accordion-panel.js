'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

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
        this.toggleButton = document.querySelector('[data-toggle-panel="' + this.panelId + '"]');
        if (this.toggleButton) {
            this.toggleIcon = this.toggleButton.querySelector('.toggle-rotate-icon');
        };
        this.openButton = document.querySelector('[data-open-panel="' + this.panelId + '"]');
        this.closeButton = document.querySelector('[data-close-panel="' + this.panelId + '"]');
        this.openRadioButton = document.querySelector('[data-radio-open-panel="' + this.panelId + '"]');
        this.closeRadioButton = document.querySelector('[data-radio-close-panel="' + this.panelId + '"]');
        this.openInputButton = document.querySelector('[data-input-open-panel="' + this.panelId + '"]');

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

            this.openListener = new _domDelegate.Delegate(this.openButton);
            this.openListener.on('click', function (event) {
                event.preventDefault();
                _this.openPanel();
            });

            this.closeListener = new _domDelegate.Delegate(this.closeButton);
            this.closeListener.on('click', function (event) {
                event.preventDefault();
                _this.closePanel();
            });

            this.radioOpenListener = new _domDelegate.Delegate(this.openRadioButton);
            this.radioOpenListener.on('change', function () {
                _this.openPanel();
            });

            this.radioCloseListener = new _domDelegate.Delegate(this.closeRadioButton);
            this.radioCloseListener.on('change', function () {
                _this.closePanel();
            });

            this.inputOpenListener = new _domDelegate.Delegate(this.openInputButton);
            this.inputOpenListener.on('focus', function () {
                _this.openPanel();
            });

            this.toggleListener = new _domDelegate.Delegate(this.toggleButton);
            this.toggleListener.on('click', function (event) {
                _this.doPanel(event);
            });
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.toggleListener.destroy();
            this.openListener.destroy();
            this.closeListener.destroy();
            this.radioOpenListener.destroy();
            this.radioCloseListener.destroy();
            this.inputOpenListener.destroy();
        }

        /**
         * Handle the panel opening.
         *
         * @param {Event} event
         */

    }, {
        key: 'doPanel',
        value: function doPanel(event) {
            if (this.panelIsVisible) {
                this.closePanel(event);
            } else {
                this.openPanel(event);
            }
        }

        /**
         * Handle the panel opening.
         *
         */

    }, {
        key: 'openPanel',
        value: function openPanel() {
            this.panel.classList.remove('slide-up');
            this.panel.classList.add('slide-down');
            if (this.toggleIcon) {
                this.toggleIcon.classList.add('rotate');
            }
            this.panelIsVisible = true;
        }

        /**
         * Handle the panel closing.
         *
         */

    }, {
        key: 'closePanel',
        value: function closePanel() {
            this.panel.classList.remove('slide-down');
            this.panel.classList.add('slide-up');
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