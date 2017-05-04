import Dropkick from 'dropkickjs';

/**
 * Remove hidden class from element, showing it via CSS.
 *
 * @param element
 */
export function show(element) {
    element.classList.remove('hidden');
}

/**
 * Apply hidden class to element, hiding it via CSS.
 *
 * @param element
 */
export function hide(element) {
    element.classList.add('hidden');
}

/**
 * Check if an element is visible (isn't hidden by CSS).
 *
 * @param element
 * @returns {boolean}
 */
export function isVisible(element) {
    return !isHidden(element);
}

/**
 * Check if an element is hidden (by CSS).
 *
 * @param element
 * @returns {boolean}
 */
export function isHidden(element) {
    return element.classList.contains('hidden');
}

/**
 * Enable element
 *
 * @param element
 * @boolean disable
 */
export function disableOrEnableDd(element, disable) {
	var select = new Dropkick(element);
	if (disable) {
		select.disable();
	} else {
		select.disable(false);
	}
}