import { getRandomInt, roundNumberTo } from './../utilities';
import chargeData from './../data/chargeData';
import * as d3 from "d3";
import queue from "d3-queue";
import * as topojson from "topojson";
import { gridmap } from './../gridmap';


let mapConfig = {};
let instances = [];

class EvMap {

    /**
     * Create a new Map.
     *
     * @param element
     */
    constructor(element) {
        mapConfig = {
            mapID: '#gridmap',
            mapWidth: 700,
            mapHeight: 553, // size of the map on the page in pixels
            mapDotStepSize: 10, // size of the map dots
            mapDotColour: '#CCCCCC', // fill colour of the dots
            mapLonLeft: -12.0, // enter the longitude in degrees on left edge of map, by comparing with Google Maps
            mapLonRight: 16.04, // enter the longitude in degrees on right edge of map
            mapLatBottom: 47.1, // enter the latitude in degrees on bottom edge of map
            timeDelay: 6000, // time in milliseconds between new charges appearing on the map
            s: 2250, // scale
            t: [300, 2350] // boundaries
        }

        this.element = element;
        this.mapElement = document.getElementById(mapConfig.mapID);
        this.markerHolder = document.getElementById('markerHolder');
        this.markerCircleHolder = document.getElementById('markerCircleHolder');
        this.markerCircle = document.getElementById('markerCircle');

        this.lastHighlightedDot = [];

        mapConfig.projection = d3.geoAzimuthalEqualArea().scale(mapConfig.s).translate(mapConfig.t).clipAngle(180).precision(1);

        const path = d3.geoPath().projection(mapConfig.projection);

        d3.queue()
            .defer(d3.json, "./assets/js/data/geo-data/eu.json")
            .await(this.ready);

        this.startCharges();
    }

    /**
     * Create the map
     *
     * @param error
     * @param eu
     */
    ready(error, eu) {
        const features =  topojson.feature(eu, eu.objects.europe).features;

        const data = d3.map();
        let j;
        let len;

        for (j = 0, len = features.length; j < len; j++) {
            data.set(features[j]["id"], getRandomInt(1,5));
        }

        let chart = gridmap()
            .data(data)
            .width(mapConfig.mapWidth)
            .height(mapConfig.mapHeight)
            .key("id")
            .side(mapConfig.mapDotStepSize)
            .isDensity(true)
            .projection(mapConfig.projection)
            .features(features)
            .fill(mapConfig.mapDotColour);

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
    showMarker(x, y, kw, saving) {
        this.lastHighlightedDot = [x, y];
        this.mapPoint = document.querySelector('circle[cx="' + x + '"][cy="' + y + '"]');

        if (this.mapPoint.length) {
            this.mapPoint.classList.add('gridmap-dot-selected');
            const kwText = document.getElementById('kw');
            kwText.innerHTML = kw;

            const savingText = document.getElementById('saving');
            savingText.innerHTML = saving;
            this.markerHolder.classList.remove('hidden');
            this.markerHolder.style.left = (x - 50) + 'px';
            this.markerHolder.style.top = (y - 50) + 'px';
            this.markerCircleHolder.classList.add('ev-map-wrap__bulge-appear');
        } else {
            this.nextCharge();
        }
    }


    /**
     * Hide the marker
     */
    hideMarker() {
        if (this.lastHighlightedDot[0]) {
            this.mapPoint = document.querySelector('circle[cx="' + this.lastHighlightedDot[0] + '"][cy="' + this.lastHighlightedDot[1] + '"]');
            if (this.mapPoint.length) {
                this.mapPoint.classList.remove('gridmap-dot-selected');
            }
        }
        this.markerCircleHolder.classList.remove('ev-map-wrap__bulge-appear');
        void this.markerCircleHolder.offsetWidth; // workaround to force browser to reflow so bulge animation class works again next time
        this.lastHighlightedDot = [];
    }

    /**
     * Convert latitude and longitude to a dot on the map
     * (adapted from http://stackoverflow.com/a/27313080)
     *
     * @param latitute
     * @param longitude
     */
    convertLatLongToDot(latitude, longitude) {
        const mapLonDelta = mapConfig.mapLonRight - mapConfig.mapLonLeft;
        const mapLatBottomDegree = mapConfig.mapLatBottom * Math.PI / 180;
        const x = (longitude - mapConfig.mapLonLeft) * (mapConfig.mapWidth / mapLonDelta);
        latitude = latitude * Math.PI / 180;
        const worldMapWidth = ((mapConfig.mapWidth / mapLonDelta) * 360) / (2 * Math.PI);
        const mapOffsetY = (worldMapWidth / 2 * Math.log((1 + Math.sin(mapLatBottomDegree)) / (1 - Math.sin(mapLatBottomDegree))));
        const y = mapConfig.mapHeight - ((worldMapWidth / 2 * Math.log((1 + Math.sin(latitude)) / (1 - Math.sin(latitude)))) - mapOffsetY);
        
        const dotX = roundNumberTo(x, mapConfig.mapDotStepSize);
        const dotY = roundNumberTo(y, mapConfig.mapDotStepSize);

        return [dotX, dotY];
    }

    /**
     * Show a charge on the map
     *
     * @param latitute
     * @param longitude
     * @param kw
     * @param saving
     */
    showChargeOnMap(latitude, longitude, kw, saving) {
        const dotCoords = this.convertLatLongToDot(latitude, longitude);
        this.showMarker(dotCoords[0], dotCoords[1], kw, saving);
    }

    /**
     * Get the next charge
     */
    nextCharge() {
        this.hideMarker();
        const charge = chargeData.charges[Math.floor(Math.random() * chargeData.charges.length)];
        this.showChargeOnMap(charge[0], charge[1], charge[2], charge[3]);
    }

    /**
     * Start showing charges on the map
     */
    startCharges() {
        this.hideMarker();
        setInterval(this.nextCharge.bind(this), mapConfig.timeDelay);
    }
}

export default {
    init: function(element) {
        instances.push(new EvMap(element));
    }
}
