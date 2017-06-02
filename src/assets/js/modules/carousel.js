import Flickity from 'flickity';

let instances = [];

class Carousel {

    /**
     * Create a new carousel element.
     *
     * @param select wrapper
     */
    constructor(element) {
        this.element = element;
        this.initFlickity();
    }

    /**
     * Initialise a Flickity carousel.
     */
    initFlickity() {
        this.carousel = new Flickity( this.element, {
            contain: true
        });
    }

    /**
     * Destroy Flickity carousel.
     */
    destroy() {
        this.carousel.destroy();
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
