'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('./../utilities');

var _chargeData = require('./../data/chargeData');

var _chargeData2 = _interopRequireDefault(_chargeData);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _d3Queue = require('d3-queue');

var _d3Queue2 = _interopRequireDefault(_d3Queue);

var _topojson = require('topojson');

var topojson = _interopRequireWildcard(_topojson);

var _gridmap = require('./../gridmap');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mapConfig = {};
var instances = [];

var EvMap = function () {

    /**
     * Create a new Map.
     *
     * @param element
     */
    function EvMap(element) {
        _classCallCheck(this, EvMap);

        mapConfig = {
            mapID: '#gridmap',
            mapWidth: 460,
            mapHeight: 267, // these values set the physical size of the map on the page
            mapDotStepSize: 6, // this sets size of the map dots
            mapDotColour: '#CCCCCC', // sets the fill colour of the dots
            mapLonLeft: -10.65, // enter the longitude in degrees on left edge of map, by comparing with Google
            mapLonRight: 20.01, // enter the longitude in degrees on right edge of map
            mapLatBottom: 49.3, // enter the latitude in degrees on bottom edge of map
            timeDelay: 3500, // time in milliseconds between new charges appearing on the map
            s: 1342, // these values set scale and boundaries of the map
            t: [168, 1382] // these values set scale and boundaries of the map
        };

        this.element = element;
        this.mapElement = element.querySelector(mapConfig.mapID);
        this.markerHolder = element.querySelector('#markerHolder');

        this.lastHighlightedDot = [];

        mapConfig.projection = d3.geoAzimuthalEqualArea().scale(mapConfig.s).translate(mapConfig.t).clipAngle(180).precision(1);

        var path = d3.geoPath().projection(mapConfig.projection);

        this.chargesData = _chargeData2.default.charges;

        d3.queue().defer(d3.json, "./assets/js/data/geo-data/eu.json").await(this.ready);

        // this.ping();
    }

    /**
     * Create the map
     *
     * @param error
     * @param eu
     */


    _createClass(EvMap, [{
        key: 'ready',
        value: function ready(error, eu) {
            var features = topojson.feature(eu, eu.objects.europe).features;

            // generate some random data
            var data = d3.map(); // data is a d3.map !!
            var j;
            var len;

            for (j = 0, len = features.length; j < len; j++) {
                data.set(features[j]["id"], (0, _utilities.getRandomInt)(1, 5));
            }

            var chart = new _gridmap.Gridmap().data(data).width(mapConfig.mapWidth).height(mapConfig.mapHeight).key("id").side(mapConfig.mapDotStepSize) // change this to make dots larger or smaller
            .isDensity(true).projection(mapConfig.projection).features(features).fill(mapConfig.mapDotColour);

            d3.select(mapConfig.mapID).call(chart);
        }

        /**
         * Show the marker
         *
         * @param x
         * @param y
         * @param kw
         * @param saving
         */

    }, {
        key: 'showMarker',
        value: function showMarker(x, y, kw, saving) {
            this.lastHighlightedDot = [x, y];
            var mapPoint = this.element.querySelectorAll('circle[cx="' + x + '"][cy="' + y + '"]');

            if (mapPoint.length) {
                mapPoint[0].classList.add('gridmap-dot-selected');
                var kwText = this.element.getElementById('kw');
                kwText.innerHTML = kw;

                savingText = this.element.getElementById('saving');
                savingText.innerHTML = saving;

                this.markerHolder.style.left = x - 32 + 'px';
                this.markerHolder.style.top = y - 32 + 'px';
                this.markerHolder.style.visibility = 'visible';
                this.markerHolder.classList.add('bulge-appear');
            } else {
                nextCharge();
            }
        }

        /**
         * Hide the marker
         */

    }, {
        key: 'hideMarker',
        value: function hideMarker() {
            if (this.lastHighlightedDot[0]) {
                mapPoint = document.querySelectorAll('circle[cx="' + this.lastHighlightedDot[0] + '"][cy="' + this.lastHighlightedDot[1] + '"]');
                if (mapPoint.length) {
                    mapPoint[0].classList.remove('gridmap-dot-selected');
                }
            }
            this.markerHolder.classList.remove('bulge-appear');
            this.markerHolder.style.visibility = 'hidden';
            void this.markerHolder.offsetWidth; // workaround to force browser to reflow so bulge animation class works again next time
            this.lastHighlightedDot = [];
        }

        /**
         * convert Lat and Long to a dot on the map
         * (adapted from http://stackoverflow.com/a/27313080)
         *
         * @param latitute
         * @param longitude
         */

    }, {
        key: 'convertLatLongToDot',
        value: function convertLatLongToDot(latitude, longitude) {
            var mapLonDelta = mapConfig.mapLonRight - mapConfig.mapLonLeft;
            var mapLatBottomDegree = mapConfig.mapLatBottom * Math.PI / 180;
            var x = (longitude - mapConfig.mapLonLeft) * (mapConfig.mapWidth / mapLonDelta);
            latitude = latitude * Math.PI / 180;
            var worldMapWidth = mapConfig.mapWidth / mapLonDelta * 360 / (2 * Math.PI);
            var mapOffsetY = worldMapWidth / 2 * Math.log((1 + Math.sin(mapLatBottomDegree)) / (1 - Math.sin(mapLatBottomDegree)));
            var y = mapConfig.mapHeight - (worldMapWidth / 2 * Math.log((1 + Math.sin(latitude)) / (1 - Math.sin(latitude))) - mapOffsetY);
            console.log(x);
            // var dotX = x.roundTo(mapConfig.mapDotStepSize);
            // var dotY = y.roundTo(mapConfig.mapDotStepSize);

            return [dotX, dotY];
        }

        /**
         * Show charge on the map
         *
         * @param latitute
         * @param longitude
         * @param kw
         * @param saving
         */

    }, {
        key: 'showChargeOnMap',
        value: function showChargeOnMap(latitude, longitude, kw, saving) {
            var dotCoords = this.convertLatLongToDot(latitude, longitude);
            showMarker(dotCoords[0], dotCoords[1], kw, saving);
        }

        /**
         * Next charge
         */

    }, {
        key: 'nextCharge',
        value: function nextCharge() {
            hideMarker();
            var charge = this.chargesData[Math.floor(Math.random() * this.chargesData.length)];
            showChargeOnMap(charge[0], charge[1], charge[2], charge[3]);
        }

        /**
         * Ping the charges
         */

    }, {
        key: 'ping',
        value: function ping() {
            setInterval(this.nextCharge, mapConfig.timeDelay);
        }
    }]);

    return EvMap;
}();

exports.default = {
    init: function init(element) {
        instances.push(new EvMap(element));
    }
};