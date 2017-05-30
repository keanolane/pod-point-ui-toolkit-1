'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tick = require('../../plugins/flip-counter/flip/tick.js');

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
        var element = document.querySelector('[data-js-module="flipCounter"]');
        var statOne = parseInt(element.getAttribute('data-stat-one'));
        var statTwo = parseInt(element.getAttribute('data-stat-two'));
        var statThree = parseInt(element.getAttribute('data-stat-three'));
        Tick.helper.interval(function () {
            statOne += Math.round(Math.random());
            statTwo += Math.round(Math.random());
            statThree += Math.round(Math.random());
            tick.value = {
                statOne: statOne,
                statTwo: statTwo,
                statThree: statThree
            };
        }, 2500);
    }
};