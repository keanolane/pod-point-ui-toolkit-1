'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var Basket = function () {

    /**
     * Creates a new basket element.
     *
     * @param element
     */
    function Basket(element) {
        _classCallCheck(this, Basket);

        this.basketItems = {};
        this.element = element;
        this.podPointUnits = (0, _domOps.nodesToArray)(document.querySelectorAll('.product'));
        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(Basket, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.podPointUnitListeners = [];
            this.podPointUnits.forEach(function (podPointUnit) {
                var podPointUnitListener = new _domDelegate.Delegate(podPointUnit);
                _this.podPointUnitListeners.push(podPointUnitListener);
                podPointUnitListener.on('change', function (event, element) {
                    _this.getDataFromProduct(element);
                });
            });
        }
    }, {
        key: 'getDataFromProduct',
        value: function getDataFromProduct(element) {
            var product = {
                id: element.getAttribute("id"),
                name: element.getAttribute("data-name"),
                price: element.getAttribute("data-price"),
                type: element.getAttribute("name")
            };
            this.basketItems[product.type] = product;
            this.updateBasket();
        }
    }, {
        key: 'updateBasket',
        value: function updateBasket() {
            var numberOfItems = Object.keys(this.basketItems).length;

            this.element.querySelector('#basketNumberOfItems').innerHTML = numberOfItems;
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {}
    }]);

    return Basket;
}();

exports.default = {
    init: function init(element) {
        instances.push(new Basket(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};