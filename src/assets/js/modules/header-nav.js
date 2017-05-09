import { Delegate } from 'dom-delegate';
import { select, addClass, removeClass, nextElement, nodesToArray } from '@pod-point/dom-ops';
import { isVisible, hide, show } from './../utilities';
import Sticky from 'sticky-js';

let instances = [];

const NAV_OPEN = 'nav-open';
const SUBNAV_OPEN = 'sub-nav-open';
const HEADER_MINFIED = 'is-minified';

let navIsOpen = false;
let subNavIsOpen = false;

let scrollPos = 0;
const headerWrap = document.querySelector('.global-header-wrap');
const stepsIndicator = document.querySelector('#stepsIndicator');

class HeaderNav {

    /**
     * Creates a new header nav element.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;
        this.navicon = this.element.querySelector('.navicon');
        this.nav = this.element.querySelector('.global-nav');
        this.headerWrap = document.querySelector('.global-header-wrap');

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

        // window.addEventListener('scroll', function() {
        //     if (document.body.scrollTop > 0) {
        //         addClass(headerWrap, HEADER_MINFIED);
        //         addClass(stepsIndicator, HEADER_MINFIED);
        //     } else {
        //         removeClass(headerWrap, HEADER_MINFIED);
        //         removeClass(stepsIndicator, HEADER_MINFIED);
        //     }
        // });
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

    /**
     * Unbinds the event listeners from the elements.
     */
    unbindEvents() {
        this.naviconListener.destroy();
        this.navListener.destroy();
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
