import flip from "../../plugins/flip-counter/flip/tick.js";
import { nodesToArray, addClass } from '@pod-point/dom-ops';

let instances = [];
const LOADED = 'loaded';

class FlipCounter {

    /**
     * Creates a new flip counter element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;
        this.createTickCounter();
    }

    /**
     * Creates a new flip counter element with options.
     */
    createTickCounter() {
        const element = this.element;
        let stat = parseInt(element.getAttribute('data-stat'));
        const flipCounterSections = document.querySelectorAll('.flip-counter-section');

        var tick = Tick.DOM.create( element, {
            value: stat,
            view: {
                children: [{
                    root: 'div',
                    layout: 'horizontal',
                    repeat: true,
                    children: [{
                        view: 'flip'
                    }]
                }]
            },
            didInit: function() {
                setTimeout(function(){
                    flipCounterSections.forEach(item => addClass(item, LOADED));
                }, 1500);
            }
        });

        Tick.helper.interval(function(){
            stat += Math.round(Math.random());
            tick.value = stat;
        }, 2500);

    }
}

export default {
    init: function(element) {
        instances.push(new FlipCounter(element));
    }
};
