"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import $ from "jquery";
// import FlipClock from "flipclock/compiled/flipclock.js";

var instances = [];

var Ticker =

/**
 * Creates a new ticker element.
 *
 * @param element
 */
function Ticker(element) {
    _classCallCheck(this, Ticker);

    this.element = element;

    // var clock = $(element).FlipClock(100, {
    //     clockFace: 'Counter'
    // });

    // setTimeout(function() {
    //     setInterval(function() {
    //         clock.increment();
    //     }, 1000);
    // });
};

exports.default = {
    init: function init(element) {
        instances.push(new Ticker(element));
    }
};