import { Delegate } from 'dom-delegate';
import { selectFirst } from '@pod-point/dom-ops';
import { isVisible, hide, show } from './../utilities';

let instances = [];

class GallerySimple {

    /**
     * Creates a gallery element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;
        this.getFirstThumbnail();
        this.bindEvents();
    }

    /**
     * Get first thumbnail and pass to function to display as the main image.
     */
    getFirstThumbnail() {
        const firstThumbnail = this.element.querySelector('.gallery-simple__thumbnails li a');
        this.displayThumbnailAsImage(firstThumbnail);
    }

    /**
     * Bind any event listeners to the elements.
     */
    bindEvents() {
        this.listener = new Delegate(this.element);

        this.listener.on('click', 'li a', (event, thumbnail) => {
            event.preventDefault();
            this.displayThumbnailAsImage(thumbnail);
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.listener.destroy();
    }

    /**
     * Display thumbnail as main image.
     */
    displayThumbnailAsImage(thumbnail) {
        const thumbnailSrc = thumbnail.querySelector('img').src;
        const mainImage = this.element.querySelector('.gallery-simple__image');

        mainImage.src = thumbnailSrc;
    }
}

export default {
    init: function(element) {
        instances.push(new GallerySimple(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
