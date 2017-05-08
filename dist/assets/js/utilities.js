'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = show;
exports.hide = hide;
exports.isVisible = isVisible;
exports.isHidden = isHidden;
exports.disableOrEnableButton = disableOrEnableButton;
exports.disableOrEnableDd = disableOrEnableDd;
exports.addItemToCookie = addItemToCookie;
exports.readItemFromCookie = readItemFromCookie;
exports.deleteItemFromCookie = deleteItemFromCookie;
exports.openPanel = openPanel;
exports.closePanel = closePanel;
exports.allRadiosSelected = allRadiosSelected;
exports.aRadioContains = aRadioContains;

var _dropkickjs = require('dropkickjs');

var _dropkickjs2 = _interopRequireDefault(_dropkickjs);

var _domOps = require('@pod-point/dom-ops');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_OPEN = 'is-open';

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
 * Enable element
 *
 * @param element
 * @boolean disable
 */
function disableOrEnableButton(element, disable) {
  if (disable) {
    element.disabled = true;
    element.classList.add('is-disabled');
  } else {
    element.disabled = false;
    element.classList.remove('is-disabled');
  }
}

/**
 * Enable element
 *
 * @param element
 * @boolean disable
 */
function disableOrEnableDd(element, disable) {
  var select = new _dropkickjs2.default(element);
  if (disable) {
    select.disable();
  } else {
    select.disable(false);
  }
}

function addItemToCookie(name, value) {
  var cookie = [name + '=' + JSON.stringify(value)];
  document.cookie = cookie;
}

function readItemFromCookie(name) {
  var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  result && (result = JSON.parse(result[1]));
  return result;
}

function deleteItemFromCookie(name) {
  document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}

function openPanel(panel) {
  var panelId = panel.getAttribute('id');
  var toggleIcon = document.querySelector('[data-toggle-icon="' + panelId + '"]');

  panel.classList.add(IS_OPEN);
  if (toggleIcon) {
    toggleIcon.classList.add('rotate');
  }
}

function closePanel(panel) {
  var panelId = panel.getAttribute('id');
  var toggleIcon = document.querySelector('[data-toggle-icon="' + panelId + '"]');

  panel.classList.remove(IS_OPEN);
  if (toggleIcon) {
    toggleIcon.classList.remove('rotate');
  }
}

function allRadiosSelected(radiosWraps) {
  var numberOfRadioGroups = (0, _domOps.nodesToArray)(radiosWraps).length;
  var numberOfRadiosSelected = 0;

  radiosWraps.forEach(function (radiosWrap) {
    var checkedRadios = (0, _domOps.nodesToArray)(radiosWrap.querySelectorAll('input[type="radio"]:checked'));
    if (checkedRadios.length === 1) {
      numberOfRadiosSelected += 1;
    }
  });
  return numberOfRadioGroups === numberOfRadiosSelected ? true : false;
}

function aRadioContains(radios, specifiedClass) {
  var containsClass = false;
  radios.forEach(function (radio) {
    if (radio.checked) {
      if (radio.classList.contains(specifiedClass)) {
        containsClass = true;
      }
    }
  });
  return containsClass;
}