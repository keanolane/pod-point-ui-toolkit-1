/* global Tick */
import { addClass, nodesToArray } from '@pod-point/dom-ops';
import '../../plugins/flip-counter/flip/tick';

const instances = [];
const LOADED = 'loaded';

class FlipCounter {

    /**
     * Creates a new flip counter element
     *
     * @param {element}
     */
    constructor(element) {
        this.element = element;
        this.createTickCounter();
    }

    /**
     * Creates a new flip counter element with options
     */
    createTickCounter() {
        const element = this.element;
        let stat = parseInt(element.getAttribute('data-stat'), 0);
        const flipCounterSections = nodesToArray(document.querySelectorAll('.flip-counter-section'));

        if (Tick.DOM) {
            const tick = Tick.DOM.create(element, {
                value: stat,
                view: {
                    children: [{
                        root: 'div',
                        layout: 'horizontal',
                        repeat: true,
                        children: [{
                            view: 'flip',
                        }],
                    }],
                },
                didInit: () => {
                    setTimeout(() => {
                        flipCounterSections.forEach(item => addClass(item, LOADED));
                    }, 1500);
                },
            });

            Tick.helper.interval(() => {
                stat += Math.round(Math.random());
                tick.value = stat;
            }, 2500);
        } else { // hide Flip Counters for unsupported browsers including IE 10 and earlier
            Array.prototype.forEach.call(document.getElementsByClassName('flip-counter-section'), flipSection => {
                flipSection.classList.add('hidden');
            });
        }

    }
}

export default {
    init: element => {
        instances.push(new FlipCounter(element));
    },
};
