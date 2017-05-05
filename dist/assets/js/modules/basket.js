'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

var _utilities = require('./../utilities');

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
        this.basketTotalItems;
        this.basketTotalPrice;

        this.element = element;
        this.podPointUnits = (0, _domOps.nodesToArray)(document.querySelectorAll('.product'));
        this.bindEvents();

        // Getting elements, element text and img src on the page to populate
        this.imgPath = element.getAttribute('data-img-path');
        this.itemListEl = element.querySelector('[data-items]');
        this.itemListEls = this.itemListEl.querySelectorAll('[data-item]');
        this.numberOfItemsEl = element.querySelector('[data-number-of-items]');
        this.totalPriceEl = element.querySelector('[data-total-price]');

        // Pod Point unit and connector
        this.unitEl = element.querySelector('[data-item="unit"]');
        this.unitNameEl = this.unitEl.querySelector('[data-unit="name"]');
        this.unitConnectorNameEl = this.unitEl.querySelector('[data-unit="connector-name"]');
        this.unitPriceEl = this.unitEl.querySelector('[data-unit="price"]');
        this.unitImgEl = this.unitEl.querySelector('[data-unit="img"]');

        // Accesories
        this.accessoryExampleContentEl = element.querySelector('[data-item="example-accessory-content"]');
        this.accessoryExampleNameEl = this.accessoryExampleContentEl.querySelector('[data-accessory="name"]');
        this.accessoryExamplePriceEl = this.accessoryExampleContentEl.querySelector('[data-accessory="price"]');
        this.accessoryExampleImgEl = this.accessoryExampleContentEl.querySelector('[data-accessory="img"]');
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
                    element.checked ? _this.addItemToBasketObj(element) : _this.deleteItemFromBasketObj(element);
                });
            });
        }
    }, {
        key: 'addItemToBasketObj',
        value: function addItemToBasketObj(element) {
            var category = (0, _domOps.hasClass)(element, 'accessory') ? 'accessory' : element.getAttribute("name");

            var product = {
                id: element.getAttribute("id"),
                name: element.getAttribute("data-name"),
                price: element.getAttribute("data-price"),
                type: element.getAttribute("name"),
                category: category
            };
            this.basketItems[product.type] = product;

            this.checkItemsToUpdate();
            this.updateDOMTotals();
        }
    }, {
        key: 'deleteItemFromBasketObj',
        value: function deleteItemFromBasketObj(element) {
            var itemId = element.getAttribute("id");
            delete this.basketItems[itemId];
            this.removeAccessory(itemId);
            this.updateDOMTotals();
        }
    }, {
        key: 'checkItemsToUpdate',
        value: function checkItemsToUpdate() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(this.basketItems)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    if (value.category === 'accessory') {
                        var itemElement = this.element.querySelector('[data-item="' + value.id + '"]');
                        // if accessory element is not empty, add accessory
                        if (!itemElement.hasChildNodes()) {
                            this.addAccessory(key, value, itemElement);
                        }
                    } else {
                        this.addUnit();
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'addUnit',
        value: function addUnit() {
            var podPointUnit = this.basketItems.podPointUnit || {};
            var podPointConnector = this.basketItems.podPointConnector || {};

            if (this.basketItems.podPointUnit) {
                (0, _utilities.show)(this.unitEl);
            }
            if (this.basketItems.podPointConnector) {
                this.unitImgEl.src = this.imgPath + podPointConnector.id + '.png';
            }

            this.unitNameEl.innerHTML = podPointUnit.name || '';
            this.unitConnectorNameEl.innerHTML = podPointConnector.name || '';
            this.unitPriceEl.innerHTML = '£' + podPointUnit.price || '';

            this.updateDOMTotals();
        }
    }, {
        key: 'addAccessory',
        value: function addAccessory(key, value, itemElement) {
            this.accessoryExampleImgEl.src = this.imgPath + value.id + '.png';
            this.accessoryExampleNameEl.innerHTML = value.name;
            this.accessoryExamplePriceEl.innerHTML = '£' + value.price;

            var accessoryItemContentClone = this.accessoryExampleContentEl.cloneNode(true);
            itemElement.appendChild(accessoryItemContentClone);
            (0, _utilities.show)(itemElement);
        }
    }, {
        key: 'removeAccessory',
        value: function removeAccessory(itemId) {
            var itemElement = this.element.querySelector('[data-item="' + itemId + '"]');
            itemElement.innerHTML = '';
            (0, _utilities.hide)(itemElement);
        }
    }, {
        key: 'updateDOMTotals',
        value: function updateDOMTotals() {
            var numberOfItems = Object.keys(this.basketItems).length;
            if ('podPointConnector' in this.basketItems) {
                numberOfItems = numberOfItems - 1;
            }
            this.numberOfItemsEl.innerHTML = numberOfItems;
            var totalPrice = 0;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.entries(this.basketItems)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        key = _step2$value[0],
                        value = _step2$value[1];

                    totalPrice = totalPrice + parseInt(value.price);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.totalPriceEl.innerHTML = '£' + totalPrice;
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