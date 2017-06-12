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

        // this.createTickCounter();
    }

    createTickCounter() {
        const element = this.element;
        let stat = parseInt(element.getAttribute('data-stat'));

        var tick = Tick.DOM.create( element, {
            value: stat,
            view: {
                children: [{
                    root: 'div',
                    layout: 'horizontal',
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
    },
    handleTickInit: function(tick) {
        const element = document.querySelector('[data-js-module="flipCounter"]');
        let statOne = parseInt(element.getAttribute('data-stat-one'));
        let statTwo = parseInt(element.getAttribute('data-stat-two'));
        let statThree = parseInt(element.getAttribute('data-stat-three'));
        Tick.helper.interval(function(){
            statOne += Math.round(Math.random());
            statTwo += Math.round(Math.random());
            statThree += Math.round(Math.random());
            tick.value = {
                statOne: statOne,
                statTwo: statTwo,
                statThree: statThree
            }
        }, 2500);
    }
};
