'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

var _utilities = require('./../utilities');

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

        this.openButton = element;
        this.panel = (0, _domOps.selectFirst)('#' + this.openButton.getAttribute('data-toggle-accordion-panel'));
        this.closeButton = (0, _domOps.selectFirst)('.accordion-panel-close', this.panel);

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
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.openListener.destroy();
            this.closeListener.destroy();
        }

        /**
         * Handle the panel opening.
         *
         * @param {Event} event
         */

    }, {
        key: 'doPanel',
        value: function doPanel(event) {
            event.preventDefault();

            if ((0, _utilities.isVisible)(this.panel)) {
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
            this.panel.classList.remove('slide-up');
            this.panel.classList.add('slide-down');
        }

        /**
         * Handle the panel closing.
         */

    }, {
        key: 'closePanel',
        value: function closePanel() {
            this.panel.classList.remove('slide-down');
            this.panel.classList.add('slide-up');
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