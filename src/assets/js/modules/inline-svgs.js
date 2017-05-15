import inlineSVG from 'inline-svg';

let instances = [];

class InlineSvgs {

    /**
     *
     * @param root
     */
    constructor(root = document.body) {
        this.svgs();
    }

    /**
     *
     */
    svgs() {
        inlineSVG.init({
            svgSelector: 'img.svg', // the class attached to all images that should be inlined
            initClass: 'js-inlinesvg', // class added to <html>
        }, function () {
            console.log('All SVGs inlined');
        });
    }
}

export default {
    init: function() {
        new InlineSvgs();
    }
};
