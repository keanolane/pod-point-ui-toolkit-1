const IS_LOADING = 'is-loading';
const IS_COMPLETE = 'is-complete';

class ProgressButton {

    /**
     * Create a new progress button.
     *
     * @param button
     */
    constructor(button) {
        this.button = button;
    }

    /**
     * Handle the button in a loading state.
     */
    handleLoading() {
        this.button.setAttribute('disabled', true);
        this.button.classList.add(IS_LOADING);
    }

    /**
     * Handle the button on success.
     *
     * @param success
     */
    handleComplete(success) {
        this.button.classList.remove(IS_LOADING);

        if (success) {
            this.button.removeAttribute('disabled');
            this.button.classList.add(IS_COMPLETE);
        }
    }
}

export default {
    create: function(button) {
        return new ProgressButton(button);
    }
}
