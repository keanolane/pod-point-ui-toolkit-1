import flip from "../../plugins/flip-counter/flip/tick.js";

let instances = [];

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
