"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tick = require("../../plugins/flip-counter/flip/tick.js");

var _tick2 = _interopRequireDefault(_tick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
};

exports.default = {
    init: function init(element) {
        instances.push(new Ticker(element));
    }
};