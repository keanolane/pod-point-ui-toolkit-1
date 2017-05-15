import { Delegate } from 'dom-delegate';
import request from 'superagent';

let instances = [];

class Chat {

    /**
     * Create a new Chat widget.
     *
     * @param element
     */
    constructor(element) {
        this.element = element;
        this.url = "https://www.zopim.com/api/v2/chats";
        this.requestInProgress = false;

        this.ajaxRequest();
    }

    ajaxRequest() {
        this.requestInProgress = true;
        request
            .get(this.url)
            .end(function(error, response) {
                this.requestInProgress = false;

                if (response && response.ok) {
                    console.log(response);
                } else {
                    console.log(error);
                }
            });
    }
}

export default {
    init: function(element) {
        instances.push(new Chat(element));
    },

    destroy: function() {
        instances.forEach((instance) => instance.unbindEvents());
        instances = [];
    }
}
