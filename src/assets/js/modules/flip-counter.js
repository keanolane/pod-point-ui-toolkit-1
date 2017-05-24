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
        var miles = 23655438;
        var energy = 5913859;
        var co2 = 2365;
        Tick.helper.interval(function(){
            miles += Math.round(Math.random());
            energy += Math.round(Math.random());
            co2 += Math.round(Math.random());
            tick.value = {
                miles: miles,
                energy: energy,
                co2: co2
            }
        }, 2000);
    }
};
