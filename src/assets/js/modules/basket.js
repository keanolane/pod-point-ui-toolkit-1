import { Delegate } from 'dom-delegate';
import { nodesToArray } from '@pod-point/dom-ops';

let instances = [];

class Basket {

    /**
     * Creates a new basket element.
     *
     * @param element
     */
    constructor(element) {
        this.basketItems = {};
        this.element = element;
        this.podPointUnits = nodesToArray(document.querySelectorAll('.product'));
        this.bindEvents();
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
                this.getDataFromProduct(element);
            });
        });
    }

    getDataFromProduct(element) {
        const product = {
            id: element.getAttribute("id"),
            name: element.getAttribute("data-name"),
            price: element.getAttribute("data-price"),
            type: element.getAttribute("name")
        }
        this.basketItems[product.type] = product;
        this.updateBasket();
    }

    updateBasket() {
        const numberOfItems = Object.keys(this.basketItems).length;

        this.element.querySelector('#basketNumberOfItems').innerHTML = numberOfItems;
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
