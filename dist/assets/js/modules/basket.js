'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _domOps = require('@pod-point/dom-ops');

var _utilities = require('./../utilities');

var _stickyJs = require('sticky-js');

var _stickyJs2 = _interopRequireDefault(_stickyJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        this.element = element;

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

        // Creating empty basket object
        var emptyBasketObj = {
            podPoint: {},
            accessories: {},
            totalItems: '',
            totalPrice: ''
        };

        var basketObjInCookie = (0, _utilities.readItemFromCookie)('basketObj');

        if (basketObjInCookie) {
            this.basketObj = basketObjInCookie;
            this.updateDomFromCookie();
        } else {
            this.basketObj = emptyBasketObj;
        }

        var basketType = this.element.getAttribute('id');

        if (basketType === 'basketOpen') {
            this.productEls = (0, _domOps.nodesToArray)(document.querySelectorAll('.product'));
            this.bindEvents();
            this.makeSticky();
        }
    }

    /**
     * Binds the event listeners from the elements.
     */


    _createClass(Basket, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.productListeners = [];
            this.productEls.forEach(function (productEl) {
                var productListener = new _domDelegate.Delegate(productEl);
                _this.productListeners.push(productListener);
                productListener.on('change', function (event, element) {
                    element.checked ? _this.addItemToBasketObj(element) : _this.deleteAccessoryFromBasketObj(element);
                });
            });
        }

        /**
         * Make basket stick to top of window when scrolled.
         */

    }, {
        key: 'makeSticky',
        value: function makeSticky() {
            var sticky = new _stickyJs2.default('#basketOpen');
        }

        /**
         * Update Basket in the DOM from the object in the cookie.
         */

    }, {
        key: 'updateDomFromCookie',
        value: function updateDomFromCookie() {
            this.updatePodPointToDOM();
            if (Object.keys(this.basketObj.accessories).length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.entries(this.basketObj.accessories)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2),
                            key = _step$value[0],
                            value = _step$value[1];

                        this.addAccessoryToDOM(value);
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
        }

        /**
         * Add item to basket object.
         * @param {element} selected element
         */

    }, {
        key: 'addItemToBasketObj',
        value: function addItemToBasketObj(element) {
            var category = (0, _domOps.hasClass)(element, 'accessory') ? 'accessory' : element.getAttribute("name");
            var podPointExists = Object.keys(this.basketObj.accessories).length > 0 ? true : false;

            switch (category) {
                case 'podPointUnit':
                    if (podPointExists) {
                        this.basketObj.podPoint.id = element.getAttribute("id");
                        this.basketObj.podPoint.name = element.getAttribute("data-name");
                        this.basketObj.podPoint.price = element.getAttribute("data-price");
                    } else {
                        this.basketObj.podPoint = {
                            id: element.getAttribute("id"),
                            name: element.getAttribute("data-name"),
                            price: element.getAttribute("data-price"),
                            imgName: 'connectorUniversal'
                        };
                    }
                    this.updatePodPointToDOM();
                    break;
                case 'podPointConnector':
                    this.basketObj.podPoint['connector'] = {
                        id: element.getAttribute("id"),
                        name: element.getAttribute("data-name")
                    };
                    this.basketObj.podPoint.imgName = element.getAttribute("id");
                    this.updatePodPointToDOM();
                    break;
                case 'accessory':
                    var accessoryObj = {
                        id: element.getAttribute("id"),
                        name: element.getAttribute("data-name"),
                        price: element.getAttribute("data-price")
                    };
                    this.basketObj.accessories[element.getAttribute("id")] = accessoryObj;
                    this.addAccessoryToDOM(accessoryObj);
                    break;
            }

            this.updateTotals();
            this.updateCookie();
        }

        /**
         * Delete item from basket object.
         * @param element
         */

    }, {
        key: 'deleteAccessoryFromBasketObj',
        value: function deleteAccessoryFromBasketObj(element) {
            var itemId = element.getAttribute("id");
            delete this.basketObj.accessories[itemId];
            this.removeAccessoryFromDOM(itemId);
            this.updateTotals();
            this.updateCookie();
        }

        /**
         * Update basket object in the cookie.
         */

    }, {
        key: 'updateCookie',
        value: function updateCookie() {
            (0, _utilities.addItemToCookie)('basketObj', this.basketObj);
            var basketObjCookie = (0, _utilities.readItemFromCookie)('basketObj');
        }

        /**
         * Add POD Point to the basket in the DOM.
         */

    }, {
        key: 'updatePodPointToDOM',
        value: function updatePodPointToDOM() {
            var podPoint = this.basketObj.podPoint || {};
            var connector = this.basketObj.podPoint.connector || {};

            if (podPoint) {
                (0, _utilities.show)(this.unitEl);
            }
            if (connector) {
                this.unitImgEl.src = this.imgPath + podPoint.imgName + '.png';
            }

            this.unitNameEl.innerHTML = podPoint.name || '';
            this.unitConnectorNameEl.innerHTML = connector.name || '';
            this.unitPriceEl.innerHTML = '£' + podPoint.price || '';
            this.unitPriceEl.setAttribute('data-price', podPoint.price);

            this.updateTotals();
        }

        /**
         * Add an accessory to the basket in the DOM.
         * @param {object} accessoryObj
         */

    }, {
        key: 'addAccessoryToDOM',
        value: function addAccessoryToDOM(accessoryObj) {
            var itemElement = this.element.querySelector('[data-item="' + accessoryObj.id + '"]');
            if (itemElement.hasChildNodes()) {
                return;
            }

            this.accessoryExampleImgEl.src = this.imgPath + accessoryObj.id + '.png';
            this.accessoryExampleNameEl.innerHTML = accessoryObj.name;
            this.accessoryExamplePriceEl.innerHTML = '£' + accessoryObj.price;

            var accessoryItemContentClone = this.accessoryExampleContentEl.cloneNode(true);
            itemElement.appendChild(accessoryItemContentClone);
            (0, _utilities.show)(itemElement);
        }

        /**
         * Remove accessory from the basket in the DOM.
         * @param accessory ID
         */

    }, {
        key: 'removeAccessoryFromDOM',
        value: function removeAccessoryFromDOM(itemId) {
            var itemElement = this.element.querySelector('[data-item="' + itemId + '"]');
            itemElement.innerHTML = '';
            (0, _utilities.hide)(itemElement);
        }

        /**
         * Update the totals of the basket in the DOM.
         */

    }, {
        key: 'updateTotals',
        value: function updateTotals() {
            // Updating total items
            var numberOfAccessories = Object.keys(this.basketObj.accessories).length;
            var numberOfPodPoint = this.basketObj.podPoint.name ? 1 : 0;
            var numberOfItems = numberOfAccessories + numberOfPodPoint;
            this.basketObj.totalItems = numberOfItems;

            // Updating total price
            var totalPrice = 0;
            totalPrice = parseInt(this.basketObj.podPoint.price) || 0;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.entries(this.basketObj.accessories)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

            this.basketObj.totalPrice = totalPrice;

            // Update the totals of the basket in the DOM
            if (this.numberOfItemsEl) {
                this.numberOfItemsEl.innerHTML = numberOfItems;
            }
            this.totalPriceEl.innerHTML = '£' + totalPrice;
            this.totalPriceEl.setAttribute('data-total-price', totalPrice);
        }

        /**
         * Unbinds the event listeners from the elements.
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.productListeners.forEach(function (productListener) {
                return productListener.destroy();
            });
        }
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