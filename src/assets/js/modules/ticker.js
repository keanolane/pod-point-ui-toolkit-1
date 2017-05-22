// import $ from "jquery";
// import FlipClock from "flipclock/compiled/flipclock.js";

let instances = [];

class Ticker {

    /**
     * Creates a new ticker element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;

        // var clock = $(element).FlipClock(100, {
        //     clockFace: 'Counter'
        // });

        // setTimeout(function() {
        //     setInterval(function() {
        //         clock.increment();
        //     }, 1000);
        // });

    }
}

export default {
    init: function(element) {
        instances.push(new Ticker(element));
    }
};
