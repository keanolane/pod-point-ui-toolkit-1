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
