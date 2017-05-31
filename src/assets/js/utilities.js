import { nodesToArray } from '@pod-point/dom-ops';

const IS_OPEN = 'is-open';

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
export function disableOrEnableButton(element, disable) {
	if (disable) {
		element.disabled = true;
		element.classList.add('is-disabled');
	} else {
		element.disabled = false;
		element.classList.remove('is-disabled');
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

export function openPanel(panel) {
	const panelId = panel.getAttribute('id');
	const toggleIcon = document.querySelector('[data-toggle-icon="'+panelId+'"]');

	panel.classList.add(IS_OPEN);
    if (toggleIcon) { toggleIcon.classList.add('rotate'); }
}

export function closePanel(panel) {
	const panelId = panel.getAttribute('id');
	const toggleIcon = document.querySelector('[data-toggle-icon="'+panelId+'"]');

	panel.classList.remove(IS_OPEN);
    if (toggleIcon) { toggleIcon.classList.remove('rotate'); }
}

export function allRadiosSelected(radiosWraps) {
	const numberOfRadioGroups = nodesToArray(radiosWraps).length;
	let numberOfRadiosSelected = 0;

    radiosWraps.forEach(radiosWrap => {
        const checkedRadios = nodesToArray(radiosWrap.querySelectorAll('input[type="radio"]:checked'));
        if (checkedRadios.length === 1) { numberOfRadiosSelected+=1 }
    });
    return (numberOfRadioGroups === numberOfRadiosSelected) ? true : false;
}

export function aRadioContains(radios, specifiedClass) {
	let containsClass = false;
    radios.forEach(radio => {
        if (radio.checked) {
            if (radio.classList.contains(specifiedClass)) { containsClass = true }
        }
    });
    return containsClass;
}

export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function roundNumberTo(num) {
	var resto = this%num;
	if (resto <= (num/2)) {
		return this-resto;
	} else {
		return this+num-resto;
	}
}
