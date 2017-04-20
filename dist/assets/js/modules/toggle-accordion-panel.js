'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var isVisible = false;

var ToggleAccordionPanel = function () {

    /**
     * Creates a new toggle panel.
     *
     * @param element
     */
    function ToggleAccordionPanel(element) {
        _classCallCheck(this, ToggleAccordionPanel);

        this.toggleButton = element;
        this.panel = (0, _domOps.selectFirst)('#' + this.toggleButton.getAttribute('data-toggle-panel'));
        this.closeButton = (0, _domOps.selectFirst)('.close-panel', this.panel);

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(ToggleAccordionPanel, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.toggleListener = new _domDelegate.Delegate(this.toggleButton);

            this.toggleListener.on('click', function (event) {
                _this.doPanel(event);
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
            this.toggleListener.destroy();
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

            if (isVisible) {
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

            var icon = (0, _domOps.selectFirst)('.circle-icon', this.toggleButton);
            icon.classList.add('rotate');

            isVisible = true;
        }

        /**
         * Handle the panel closing.
         */

    }, {
        key: 'closePanel',
        value: function closePanel() {
            this.panel.classList.remove('slide-down');
            this.panel.classList.add('slide-up');

            var icon = (0, _domOps.selectFirst)('.circle-icon', this.toggleButton);
            icon.classList.remove('rotate');

            isVisible = false;
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