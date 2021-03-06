'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domOps = require('@pod-point/dom-ops');

var _utilities = require('./../utilities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];
var MODAL_OPEN = 'is-modal-open';

var Modal = function () {

    /**
     * Creates a new modal window
     *
     * @param {element}
     */
    function Modal(element) {
        _classCallCheck(this, Modal);

        this.openButton = element;
        var modalID = this.openButton.getAttribute('data-modal');
        this.modal = document.querySelector('#' + modalID);
        this.closeButton = this.modal.querySelector('.modal-close');
        this.videoWrapper = this.modal.querySelector('.video-wrapper');

        this.bindEvents();
    }

    /**
     * Binds the event listeners from the elements
     */


    _createClass(Modal, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.openButton.addEventListener('click', function () {
                _this.openModal();
            });

            this.closeButton.addEventListener('click', function (event) {
                event.preventDefault();
                _this.closeModal();
            });

            this.modal.addEventListener('click', function (event) {
                if (event.target === _this.modal) {
                    _this.closeModal();
                }
            });

            document.body.addEventListener('keyup', function (event) {
                if (event.keyCode === 27) {
                    _this.closeModal();
                }
            });
        }

        /**
         * Handle the modal opening
         *
         * @param {event}
         */

    }, {
        key: 'doModal',
        value: function doModal(event) {
            event.preventDefault();

            if ((0, _utilities.isVisible)(this.modal)) {
                this.closeModal();
            } else {
                this.openModal();
            }
        }

        /**
         * Handle the modal opening
         */

    }, {
        key: 'openModal',
        value: function openModal() {
            (0, _domOps.addClass)(document.documentElement, MODAL_OPEN);
            (0, _utilities.show)(this.modal);

            var overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            document.body.appendChild(overlay);
        }

        /**
         * Handle the modal closing
         */

    }, {
        key: 'closeModal',
        value: function closeModal() {
            (0, _domOps.removeClass)(document.documentElement, MODAL_OPEN);
            (0, _utilities.hide)(this.modal);

            if (this.videoWrapper) {
                var wrapperId = this.videoWrapper.getAttribute('id');
                if (window[wrapperId].pause) {
                    window[wrapperId].pause();
                } else if (window[wrapperId].pauseVideo) {
                    window[wrapperId].pauseVideo();
                }
            }

            var overlay = document.querySelector('.modal-overlay');
            if (overlay !== null) {
                document.body.removeChild(overlay);
            }
        }

        /**
         * Unbinds the event listeners from the elements
         */

    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.openListener.destroy();
            this.closeListener.destroy();
            this.overlayListener.destroy();
            this.windowListener.destroy();
        }
    }]);

    return Modal;
}();

exports.default = {
    init: function init(element) {
        instances.push(new Modal(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};