'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domDelegate = require('dom-delegate');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = [];

var Chat = function () {

    /**
     * Create a new Chat widget.
     *
     * @param element
     */
    function Chat(element) {
        _classCallCheck(this, Chat);

        this.element = element;
        this.url = "https://www.zopim.com/api/v2/chats";
        this.requestInProgress = false;

        this.ajaxRequest();
    }

    _createClass(Chat, [{
        key: 'ajaxRequest',
        value: function ajaxRequest() {
            this.requestInProgress = true;
            _superagent2.default.get(this.url).end(function (error, response) {
                this.requestInProgress = false;

                if (response && response.ok) {
                    console.log(response);
                } else {
                    console.log(error);
                }
            });
        }
    }]);

    return Chat;
}();

exports.default = {
    init: function init(element) {
        instances.push(new Chat(element));
    },

    destroy: function destroy() {
        instances.forEach(function (instance) {
            return instance.unbindEvents();
        });
        instances = [];
    }
};