'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _dropkickjs = require('dropkickjs');

var _dropkickjs2 = _interopRequireDefault(_dropkickjs);

var _domOps = require('@pod-point/dom-ops');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var SELECT_WRAP_MOBILE = 'select-dd-wrapper--mobile';

var SelectDropDown = function () {

    /**
     * Create a new select dropdown element.
     *
     * @param select wrapper
     */
    function SelectDropDown(element) {
        _classCallCheck(this, SelectDropDown);

        this.element = element;
        isTouchDevice ? this.setUpTouchVerison() : this.setUpDesktopVersion();
    }

    /**
     * For desktop: creates a new select drop down element using DropkickJS.
     */


    _createClass(SelectDropDown, [{
        key: 'setUpDesktopVersion',
        value: function setUpDesktopVersion() {
            var selectDD = this.element.querySelector('select');
            this.dropkick = new _dropkickjs2.default(selectDD);
        }

        /**
         * For touch devices: keeps native select but adds fake select box for better styling.
         */

    }, {
        key: 'setUpTouchVerison',
        value: function setUpTouchVerison() {
            var select = this.element.querySelector('select');
            var selectDDText = this.element.querySelector('option[selected]').innerHTML;
            (0, _domOps.addClass)(this.element, SELECT_WRAP_MOBILE);
            (0, _domOps.insertAfter)(select, '<div class="mobile-select">' + selectDDText + '</div>');
            this.bindTouchEvents();
        }

        /**
         * Bind events for touch devices.
         */

    }, {
        key: 'bindTouchEvents',
        value: function bindTouchEvents() {
            var selectDDWrap = this.element.closest('.select-dd-wrapper');
            this.listener = new _domDelegate.Delegate(selectDDWrap);

            this.listener.on('change', 'select', function (event, element) {
                var selectDDText = element.options[element.selectedIndex].text;
                element.closest('.select-dd-wrapper').querySelector('.mobile-select').innerHTML = selectDDText;
            });
        }

        /**
         * Destroys dropkick instance and unbinds the event listeners from the elements.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.dropkick !== undefined) {
                this.dropkick.dispose();
            }
            if (this.listener !== undefined) {
                this.listener.destroy();
            }
        }

        /**
         * Refreshes dropkick instance (used for if the markup changes).
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.dropkick !== undefined) {
                this.dropkick.refresh();
            }
        }
    }]);

    return SelectDropDown;
}();

exports.default = {
    init: function init(element) {
        instances.push(new SelectDropDown(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.destroy();
        });
        instances = [];
    },

    refresh: function refresh() {
        instances.forEach(function (instance) {
            return instance.refresh();
        });
        instances = [];
    }
};