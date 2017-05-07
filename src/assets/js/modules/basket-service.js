import { Delegate } from 'dom-delegate';
import { nodesToArray, hasClass } from '@pod-point/dom-ops';
import { isVisible, hide, show, addItemToCookie, readItemFromCookie, deleteItemFromCookie } from './../utilities';

let instances = [];

class BasketService {

    /**
     * Creates a new basket element.
     *
     * @param element
     */
    constructor(element) {
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
        const emptyBasketObj = {
            podPoint: {},
            accessories: {},
            totalItems: '',
            totalPrice: ''
        }

        const basketObjInCookie = readItemFromCookie('basketObj');
        this.basketObj = basketObjInCookie || emptyBasketObj;
        if (basketObjInCookie) { this.updateDomFromCookie() }

        const basketType = this.element.getAttribute('id');

        if (basketType === 'basketOpen') {
            this.productEls = nodesToArray(document.querySelectorAll('.product'));
            this.bindEvents();
        }

        this.updateDomFromCookie();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.productListeners = [];
        this.productEls.forEach(productEl => {
            const productListener = new Delegate(productEl);
            this.productListeners.push(productListener);
            productListener.on('change', (event, element) => {
                (element.checked) ? this.addItemToBasketObj(element) : this.deleteAccessoryFromBasketObj(element);
            });
        });
    }

    updateDomFromCookie() {
        this.updatePodPointToDOM();
        if (Object.keys(this.basketObj.accessories).length > 0) {
            for (var [key, value] of Object.entries(this.basketObj.accessories)) {
                this.addAccessoryToDOM(value);
            }
        }
    }

    /**
     * Add item to basket object.
     *
     * @param element
     */
    addItemToBasketObj(element) {
        const category = hasClass(element, 'accessory') ? 'accessory' : element.getAttribute("name");

        switch(category) {
            case 'podPointUnit':
                this.basketObj.podPoint = {
                    id: element.getAttribute("id"),
                    name: element.getAttribute("data-name"),
                    price: element.getAttribute("data-price"),
                    imgName: 'connectorUniversal'
                }
                this.updatePodPointToDOM();
                break;
            case 'podPointConnector':
                this.basketObj.podPoint['connector'] = {
                    id: element.getAttribute("id"),
                    name: element.getAttribute("data-name")
                }
                this.basketObj.podPoint.imgName = element.getAttribute("id");
                this.updatePodPointToDOM();
                break;
            case 'accessory':
                const accessoryObj = {
                    id: element.getAttribute("id"),
                    name: element.getAttribute("data-name"),
                    price: element.getAttribute("data-price")
                }
                this.basketObj.accessories[element.getAttribute("id")] = accessoryObj;
                this.addAccessoryToDOM(accessoryObj);
                break;
        }

        console.log(this.basketObj);
        this.updateTotals();
        this.updateCookie();
    }

    /**
     * Delete item from basket object.
     *
     * @param element
     */
    deleteAccessoryFromBasketObj(element) {
        const itemId = element.getAttribute("id");
        delete this.basketObj.accessories[itemId];
        this.removeAccessoryFromDOM(itemId);
        this.updateTotals();
        this.updateCookie();
    }

    /**
     * Update basket in cookie.
     */
    updateCookie() {
        addItemToCookie('basketObj', this.basketObj);
        var basketObjCookie = readItemFromCookie('basketObj');
    }

    /**
     * Add POD Point to the basket in the DOM.
     */
    updatePodPointToDOM() {
        const podPoint = this.basketObj.podPoint || {};
        const connector = this.basketObj.podPoint.connector || {};

        if (podPoint) { show(this.unitEl) }
        if (connector) { this.unitImgEl.src = this.imgPath + podPoint.imgName + '.png'; }

        this.unitNameEl.innerHTML = podPoint.name || '';
        this.unitConnectorNameEl.innerHTML = connector.name || '';
        this.unitPriceEl.innerHTML = '£' + podPoint.price || '';

        this.updateTotals();
    }

    /**
     * Add an accessory to the basket in the DOM.
     * @param {object} accessoryObj
     */
    addAccessoryToDOM(accessoryObj) {
        const itemElement = this.element.querySelector('[data-item="'+accessoryObj.id+'"]');
        if (itemElement.hasChildNodes()) { return }

        this.accessoryExampleImgEl.src = this.imgPath + accessoryObj.id + '.png';
        this.accessoryExampleNameEl.innerHTML = accessoryObj.name;
        this.accessoryExamplePriceEl.innerHTML = '£' + accessoryObj.price;

        const accessoryItemContentClone = this.accessoryExampleContentEl.cloneNode(true);
        itemElement.appendChild(accessoryItemContentClone);
        show(itemElement);
    }

    /**
     * Remove accessory from the basket in the DOM.
     * @param accessory ID
     */
    removeAccessoryFromDOM(itemId) {
        const itemElement = this.element.querySelector('[data-item="'+itemId+'"]');
        itemElement.innerHTML = '';
        hide(itemElement);
    }

    /**
     * Update the totals of the basket in the DOM.
     */
    updateTotals() {
        // Updating total items
        const numberOfAccessories = Object.keys(this.basketObj.accessories).length;
        const numberOfPodPoint = this.basketObj.podPoint.name ? 1 : 0;
        const numberOfItems = numberOfAccessories + numberOfPodPoint;
        this.basketObj.totalItems = numberOfItems;

        // Updating total price
        let totalPrice = 0;
        totalPrice = parseInt(this.basketObj.podPoint.price) || 0;

        for (var [key, value] of Object.entries(this.basketObj.accessories)) {
            totalPrice = totalPrice + parseInt(value.price);
        }
        this.basketObj.totalPrice = totalPrice;

        // Update the totals of the basket in the DOM
        if (this.numberOfItemsEl) {this.numberOfItemsEl.innerHTML = numberOfItems}
        this.totalPriceEl.innerHTML = '£' + totalPrice;
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
    }
}

export default {
    init: function(element) {
        instances.push(new Basket(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
