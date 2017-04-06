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

var NAV_OPEN = 'nav-open';
var SUBNAV_OPEN = 'sub-nav-open';

var navIsOpen = false;
var subNavIsOpen = false;

var HeaderNav = function () {

    /**
     * Creates a new header nav element.
     *
     * @param element
     */
    function HeaderNav(element) {
        _classCallCheck(this, HeaderNav);

        this.element = element;
        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(HeaderNav, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.listener = new _domDelegate.Delegate(this.element);

            this.listener.on('click', '.navicon', function (event) {
                _this.toggleNav(event);
            });
            this.listener.on('click', '.plus-minus-toggle', function (event, clickedElement) {
                _this.toggleSubNav(event, clickedElement);
            });
        }

        /**
         * Toggles the nav.
         *
         * @param {Event} event
         */

    }, {
        key: 'toggleNav',
        value: function toggleNav(event) {
            event.preventDefault();

            if (navIsOpen) {
                navIsOpen = false;
                (0, _domOps.removeClass)(this.element, NAV_OPEN);
            } else {
                navIsOpen = true;
                (0, _domOps.addClass)(this.element, NAV_OPEN);
            }
        }

        /**
         * Closes all sub navs.
         */

    }, {
        key: 'closeSubNavs',
        value: function closeSubNavs() {
            var openSubNavs = (0, _domOps.nodesToArray)((0, _domOps.select)('.has-sub-nav.sub-nav-open'));
            if (openSubNavs.length) {
                openSubNavs.forEach(function (openSubNav) {
                    (0, _domOps.removeClass)(openSubNav, SUBNAV_OPEN);
                });
            }
        }

        /**
         * Toggles the sub nav.
         *
         * @param {Event} event
         * @param {Element} element
         */

    }, {
        key: 'toggleSubNav',
        value: function toggleSubNav(event, clickedElement) {
            event.preventDefault();
            var subNavLi = clickedElement.closest('li');
            var subNavIsOpen = clickedElement.closest('.has-sub-nav.sub-nav-open');
            if (subNavIsOpen == null) {
                this.closeSubNavs();
                (0, _domOps.addClass)(subNavLi, SUBNAV_OPEN);
            } else {
                (0, _domOps.removeClass)(subNavLi, SUBNAV_OPEN);
            }
        }
    }]);

    return HeaderNav;
}();

exports.default = {
    init: function init(element) {
        instances.push(new HeaderNav(element));
    }
};