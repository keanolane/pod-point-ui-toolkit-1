'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IS_LOADING = 'is-loading';
var IS_COMPLETE = 'is-complete';

var ProgressButton = function () {

    /**
     * Create a new progress button.
     *
     * @param button
     */
    function ProgressButton(button) {
        _classCallCheck(this, ProgressButton);

        this.button = button;
    }

    /**
     * Handle the button in a loading state.
     */


    _createClass(ProgressButton, [{
        key: 'handleLoading',
        value: function handleLoading() {
            this.button.setAttribute('disabled', true);
            this.button.classList.add(IS_LOADING);
        }

        /**
         * Handle the button on success.
         *
         * @param success
         */

    }, {
        key: 'handleComplete',
        value: function handleComplete(success) {
            this.button.classList.remove(IS_LOADING);

            if (success) {
                this.button.removeAttribute('disabled');
                this.button.classList.add(IS_COMPLETE);
            }
        }
    }]);

    return ProgressButton;
}();

exports.default = {
    create: function create(button) {
        return new ProgressButton(button);
    }
};