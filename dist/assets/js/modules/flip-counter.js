"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tick = require("../../plugins/flip-counter/flip/tick.js");

var _tick2 = _interopRequireDefault(_tick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var FlipCounter =

/**
 * Creates a new flip counter element.
 *
 * @param element
 */
function FlipCounter(element) {
    _classCallCheck(this, FlipCounter);

    this.element = element;
};

exports.default = {
    init: function init(element) {
        instances.push(new FlipCounter(element));
    },
    handleTickInit: function handleTickInit(tick) {
        var miles = 23655438;
        var energy = 5913859;
        var co2 = 2365;
        Tick.helper.interval(function () {
            miles += Math.round(Math.random());
            energy += Math.round(Math.random());
            co2 += Math.round(Math.random());
            tick.value = {
                miles: miles,
                energy: energy,
                co2: co2
            };
        }, 2000);
    }
};