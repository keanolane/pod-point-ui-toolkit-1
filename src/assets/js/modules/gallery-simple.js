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
        this.bindEvents();
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
    }
};
