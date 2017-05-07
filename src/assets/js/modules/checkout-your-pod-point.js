import { Delegate } from 'dom-delegate';
import { nodesToArray, addClass } from '@pod-point/dom-ops';
import { disableOrEnableDd, readItemFromCookie } from './../utilities';

let instances = [];

class CheckoutYourPodPoint {

    /**
     * Creates a new form element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;

        this.selectEvMake = this.element.querySelector('#selectEvMake');
        this.selectEvModel = this.element.querySelector('#selectEvModel');
        this.carImage = this.element.querySelector('#carImage');

        this.productEls = nodesToArray(document.querySelectorAll('.product'));
        this.basketObj = readItemFromCookie('basketObj');
        if (this.basketObj) { this.preselectFields() }

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.selectEVMakeListener = new Delegate(this.selectEvMake);

        this.selectEVMakeListener.on('change', (event, element) => {
            disableOrEnableDd(this.selectEvModel);
        });

        this.selectEVModelListener = new Delegate(this.selectEvModel);

        this.selectEVModelListener.on('change', (event, element) => {
            this.carImage.src = "assets/img/content/cars/nissan.png";
        });
    }

    /**
     * Dynamically checks product checkboxes and rados, based on basket object in cookie.
     */
    preselectFields() {
        const podPointUnitId = this.basketObj.podPoint.id;
        const connector = this.basketObj.podPoint.connector;
        const accessories = this.basketObj.accessories;

        if (podPointUnitId) { this.element.querySelector('[value="'+podPointUnitId+'"]').checked = true };
        if (connector) {
            this.element.querySelector('[value="'+connector.id+'"]').checked = true;
            addClass(this.element.querySelector('#connectors'), 'is-open');
        };

        if (Object.keys(accessories).length > 0) {
            for (var [key, value] of Object.entries(this.basketObj.accessories)) {
                this.element.querySelector('[value="'+key+'"]').checked = true
            }
        }
    }


    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.selectEVMakeListener.destroy();
        this.selectEVModelListener.destroy();
    }
}

export default {
    init: function(element) {
        instances.push(new CheckoutYourPodPoint(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
