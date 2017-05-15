import inlineSVG from 'inline-svg';

let instances = [];

class inlineSvg {

    /**
     */
    constructor(root = document.body) {
        this.makeInline();
    }

    /**
     */
    makeInline() {
        inlineSVG.init({
          svgSelector: 'img.svg', // the class attached to all images that should be inlined
          initClass: 'js-inlinesvg', // class added to <html>
        }, function () {
          console.log('All SVGs inlined');
        });
    }
}

export default {
    init: function(root) {
        instances.push(new inlineSvg(root));
    },
}
