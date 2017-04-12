import { Delegate } from 'dom-delegate';
import { select, addClass, removeClass, nextElement, nodesToArray, selectFirst } from '@pod-point/dom-ops';
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
        this.navicon = selectFirst('.navicon', this.element);
        this.nav = selectFirst('.global-nav', this.element);

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements.
     */
    bindEvents() {
        this.naviconListener = new Delegate(this.navicon);

        this.naviconListener.on('click', (event) => {
            this.toggleNav(event);
        });

        this.navListener = new Delegate(this.nav);

        this.navListener.on('click', '.has-sub-nav a', (event, clickedElement) => {
            this.toggleSubNav(event, clickedElement);
        });
    }

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.naviconListener.destroy();
        this.navListener.destroy();
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
    },
    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
};
