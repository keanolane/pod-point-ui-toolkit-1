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

export function addItemToCookie(name, value) {
	var cookie = [name + '=' + JSON.stringify(value)];
	document.cookie = cookie;
}

export function readItemFromCookie(name) {
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	return result;
}

export function deleteItemFromCookie(name) {
	document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}