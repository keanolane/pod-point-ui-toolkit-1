import Slider from "slick-carousel";
import $ from "jquery";

let instances = [];

class Carousel {

    /**
     * Create a new carousel element.
     *
     * @param select wrapper
     */
    constructor(element) {
        this.element = element;
        this.initSlick();
    }

    /**
     * Initialise a slick slider.
     */
    initSlick() {
        $(this.element).slick();
    }

    /**
     * Destroy slick slider.
     */
    destroy() {
        $(this.element).slick('unslick');
    }
}

export default {
    init: function(element) {
        instances.push(new Carousel(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.destroy());
        instances = [];
    }
};
