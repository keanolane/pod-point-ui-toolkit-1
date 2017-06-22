'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global google */


var _utilities = require('./../utilities');

Object.defineProperty(exports, '__esModule', {
    value: true
});

var autocomplete = void 0;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

var fillInAddress = function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.entries(componentForm)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 1),
                key = _step$value[0];

            document.getElementById(key).value = '';
            document.getElementById(key).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    place.address_components.forEach(function (value) {
        var addressType = value.types[0];
        if (componentForm[addressType]) {
            var val = value[componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    });

    (0, _utilities.openPanel)(document.querySelector('#address'));
};

var initAutocomplete = function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */document.getElementById('autocomplete'), { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
};

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
var geolocate = function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
};

exports.initAutocomplete = initAutocomplete;
exports.fillInAddress = fillInAddress;
exports.geolocate = geolocate;