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
        this.slick();
    }

    slick() {
        $(this.element).slick();
    }
}

export default {
    init: function(element) {
        instances.push(new Carousel(element));
    }
};
