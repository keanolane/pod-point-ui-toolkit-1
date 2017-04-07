import { Delegate } from 'dom-delegate';
import { select, addClass, removeClass, nextElement, nodesToArray } from '@pod-point/dom-ops';
import { isVisible, hide, show } from './../utilities';

let instances = [];

const NAV_OPEN = 'nav-open';
const SUBNAV_OPEN = 'sub-nav-open';

let navIsOpen = false;
let subNavIsOpen = false;


class HeaderNav {

    /**
     * Creates a new header nav element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;
        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.listener = new Delegate(this.element);

        this.listener.on('click', '.navicon', (event) => {
            this.toggleNav(event);
        });
        this.listener.on('click', '.has-sub-nav a', (event, clickedElement) => {
            this.toggleSubNav(event, clickedElement);
        });
    }

    /**
     * Toggles the nav.
     *
     * @param {Event} event
     */
    toggleNav(event) {
        event.preventDefault();

        if (navIsOpen) {
            navIsOpen = false;
            removeClass(this.element, NAV_OPEN);
        } else {
            navIsOpen = true;
            addClass(this.element, NAV_OPEN);
        }
    }

    /**
     * Closes all sub navs.
     */
    closeSubNavs() {
        var openSubNavs = nodesToArray(select('.has-sub-nav.sub-nav-open'));
        if (openSubNavs.length) {
            openSubNavs.forEach(openSubNav => {
                removeClass(openSubNav, SUBNAV_OPEN);
            });
        }
    }

    /**
     * Toggles the sub nav.
     *
     * @param {Event} event
     * @param {Element} element
     */
    toggleSubNav(event, clickedElement) {
        event.preventDefault();
        const subNavLi = clickedElement.closest('li');
        const subNavIsOpen = clickedElement.closest('.has-sub-nav.sub-nav-open');
        if (subNavIsOpen == null) {
            this.closeSubNavs();
            addClass(subNavLi, SUBNAV_OPEN);
        } else {
            removeClass(subNavLi, SUBNAV_OPEN);
        }
    }
}

export default {
    init: function(element) {
        instances.push(new HeaderNav(element));
    }
};
