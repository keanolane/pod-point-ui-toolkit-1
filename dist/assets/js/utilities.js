'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = show;
exports.hide = hide;
exports.isVisible = isVisible;
exports.isHidden = isHidden;
exports.isTouchDevice = isTouchDevice;
/**
 * Remove hidden class from element, showing it via CSS.
 *
 * @param element
 */
function show(element) {
  element.classList.remove('hidden');
}

/**
 * Apply hidden class to element, hiding it via CSS.
 *
 * @param element
 */
function hide(element) {
  element.classList.add('hidden');
}

/**
 * Check if an element is visible (isn't hidden by CSS).
 *
 * @param element
 * @returns {boolean}
 */
function isVisible(element) {
  return !isHidden(element);
}

/**
 * Check if an element is hidden (by CSS).
 *
 * @param element
 * @returns {boolean}
 */
function isHidden(element) {
  return element.classList.contains('hidden');
}

/**
 * Check if is touch device.
 *
 * @returns {boolean}
 */
function isTouchDevice() {
  if ('ontouchstart' in document.documentElement) {
    return true;
  } else {
    return false;
  }
}