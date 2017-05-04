import { Delegate } from 'dom-delegate';
import { disableOrEnableDd } from './../utilities';

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
