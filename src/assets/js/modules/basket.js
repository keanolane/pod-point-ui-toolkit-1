import { Delegate } from 'dom-delegate';
import { nodesToArray, hasClass } from '@pod-point/dom-ops';
import { isVisible, hide, show, addItemToCookie, readItemFromCookie, deleteItemFromCookie } from './../utilities';

let instances = [];

class Basket {

    /**
     * Creates a new basket element.
     *
     * @param element
     */
    constructor(element) {
        const basketObjCookie = readItemFromCookie('basketObj');

        if (!basketObjCookie) {
            this.basketObj = {
                items: {},
                totalItems: '',
                totalPrice: ''
            }
        }

        this.element = element;
        const basketType = this.element.getAttribute('id');

        if (basketType === 'basketOpen') {
            this.podPointUnits = nodesToArray(document.querySelectorAll('.product'));
            this.bindEvents();
        } else {
            console.log('basket final');
        }

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
    bindEvents() {
        this.podPointUnitListeners = [];
        this.podPointUnits.forEach(podPointUnit => {
            const podPointUnitListener = new Delegate(podPointUnit);
            this.podPointUnitListeners.push(podPointUnitListener);
            podPointUnitListener.on('change', (event, element) => {
                (element.checked) ? this.addItemToBasketObj(element) : this.deleteItemFromBasketObj(element);
            });
        });
    }

    addItemToBasketObj(element) {
        const category = hasClass(element, 'accessory') ? 'accessory' : element.getAttribute("name");

        const product = {
            id: element.getAttribute("id"),
            name: element.getAttribute("data-name"),
            price: element.getAttribute("data-price"),
            type: element.getAttribute("name"),
            category: category
        }
        this.basketObj.items[product.type] = product;

        this.checkItemsToUpdate();
        this.updateDOMTotals();

        this.updateCookie();
    }

    deleteItemFromBasketObj(element) {
        const itemId = element.getAttribute("id");
        delete this.basketObj.items[itemId];
        this.removeAccessory(itemId);
        this.updateDOMTotals();

        this.updateCookie();
    }

    updateCookie() {
        addItemToCookie('basketObj', this.basketObj);
        var basketObjCookie = readItemFromCookie('basketObj');
    }

    checkItemsToUpdate() {
        for (var [key, value] of Object.entries(this.basketObj.items)) {
            if (value.category === 'accessory') {
                const itemElement = this.element.querySelector('[data-item="'+value.id+'"]');
                // if accessory element is not empty, add accessory
                if (!itemElement.hasChildNodes()) {
                    this.addAccessory(key, value, itemElement);
                }
            } else {
                this.addUnit();
            }
        }
    }

    addUnit() {
        const podPointUnit = this.basketObj.items.podPointUnit || {};
        const podPointConnector = this.basketObj.items.podPointConnector || {};

        if (this.basketObj.items.podPointUnit) { show(this.unitEl) }
        if (this.basketObj.items.podPointConnector) { this.unitImgEl.src = this.imgPath + podPointConnector.id + '.png'; }

        this.unitNameEl.innerHTML = podPointUnit.name || '';
        this.unitConnectorNameEl.innerHTML = podPointConnector.name || '';
        this.unitPriceEl.innerHTML = '£' + podPointUnit.price || '';

        this.updateDOMTotals();
    }

    addAccessory(key, value, itemElement) {
        this.accessoryExampleImgEl.src = this.imgPath + value.id + '.png';
        this.accessoryExampleNameEl.innerHTML = value.name;
        this.accessoryExamplePriceEl.innerHTML = '£' + value.price;

        const accessoryItemContentClone = this.accessoryExampleContentEl.cloneNode(true);
        itemElement.appendChild(accessoryItemContentClone);
        show(itemElement);
    }

    removeAccessory(itemId) {
        const itemElement = this.element.querySelector('[data-item="'+itemId+'"]');
        itemElement.innerHTML = '';
        hide(itemElement);
    }

    updateDOMTotals() {
        let numberOfItems = Object.keys(this.basketObj.items).length;
        if ('podPointConnector' in this.basketObj.items) { numberOfItems = numberOfItems - 1 }
        this.numberOfItemsEl.innerHTML = numberOfItems;
        let totalPrice = 0;

        for (var [key, value] of Object.entries(this.basketObj.items)) {
            totalPrice = totalPrice + parseInt(value.price);
        }
        this.totalPriceEl.innerHTML = '£' + totalPrice;

        this.basketObj.totalItems = numberOfItems;
        this.basketObj.totalPrice = totalPrice;
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
