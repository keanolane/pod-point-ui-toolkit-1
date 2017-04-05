'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _dropkickjs = require('dropkickjs');

var _dropkickjs2 = _interopRequireDefault(_dropkickjs);

var _domOps = require('@pod-point/dom-ops');

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var selectSelector = document.querySelectorAll('.select-dd-wrapper select');
var selectDDs = [];

var SelectDropDown = function () {

    /**
     * Runs init functions.
     */
    function SelectDropDown() {
        _classCallCheck(this, SelectDropDown);

        this.getAllSelects();
    }

    /**
     * Gets all selects and passes them to functions according to device type (desktop/touch).
     */


    _createClass(SelectDropDown, [{
        key: 'getAllSelects',
        value: function getAllSelects() {
            var _this = this;

            var isTouch = (0, _utilities.isTouchDevice)();
            selectDDs = (0, _domOps.nodesToArray)(selectSelector);

            selectDDs.forEach(function (selectDD) {
                isTouch ? _this.setUpTouchVerison(selectDD) : _this.setUpDesktopVersion(selectDD);
            });
        }

        /**
         * For desktop: creates a new select drop down element using DropkickJS.
         */

    }, {
        key: 'setUpDesktopVersion',
        value: function setUpDesktopVersion(selectDD) {
            new _dropkickjs2.default(selectDD);
        }

        /**
         * For touch devices: keeps native select but adds fake select box for better styling.
         */

    }, {
        key: 'setUpTouchVerison',
        value: function setUpTouchVerison(selectDD) {
            var selectDDText = selectDD.querySelector('option[selected]').innerHTML;
            (0, _domOps.insertBefore)(selectDD, '<div class="mobile-select">' + selectDDText + '</div>');
            this.bindTouchEvents(selectDD);
        }

        /**
         * Bind events for touch devices.
         */

    }, {
        key: 'bindTouchEvents',
        value: function bindTouchEvents(selectDD) {
            var selectDDWrap = selectDD.closest('.select-dd-wrapper');
            var listener = new _domDelegate.Delegate(selectDDWrap);

            listener.on('change', 'select', function (event, element) {
                var selectDDText = element.options[element.selectedIndex].text;
                element.closest('.select-dd-wrapper').querySelector('.mobile-select').innerHTML = selectDDText;
            });
        }
    }]);

    return SelectDropDown;
}();

exports.default = {
    init: function init() {
        if (selectSelector.length) {
            new SelectDropDown();
        }
    }
};