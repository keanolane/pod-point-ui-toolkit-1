/* eslint class-methods-use-this: ["error", { "exceptMethods": ["ready"] }] */

import * as d3 from 'd3';
import * as topojson from 'topojson';
import { getRandomInt, roundNumberTo } from './../utilities';
import chargeData from './../data/chargeData';
import gridmap from './../gridmap';

let mapConfig = {};
const instances = [];

class EvMap {

    /**
     * Create a new Map
     *
     * @param {element}
     */
    constructor(element) {
        if (window.isTouchDevice || window.isMobileSize) { return; }

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
            t: [300, 2350], // boundaries
        };

        this.element = element;
        this.jsonPath = element.getAttribute('data-json-path');
        this.mapElement = document.getElementById(mapConfig.mapID);
        this.markerHolder = document.getElementById('markerHolder');
        this.markerCircleHolder = document.getElementById('markerCircleHolder');
        this.markerCircle = document.getElementById('markerCircle');
        this.kwText = document.getElementById('kw');
        this.lastHighlightedDot = [];

        mapConfig.projection = d3.geoAzimuthalEqualArea().scale(mapConfig.s)
            .translate(mapConfig.t).clipAngle(180)
            .precision(1);

        d3.queue()
            .defer(d3.json, this.jsonPath)
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
        const features = topojson.feature(eu, eu.objects.europe).features;
        const data = d3.map();
        let j;
        let len;

        for (j = 0, len = features.length; j < len; j += 1) {
            data.set(features[j].id, getRandomInt(1, 5));
        }

        const chart = gridmap()
            .data(data)
            .width(mapConfig.mapWidth)
            .height(mapConfig.mapHeight)
            .key('id')
            .side(mapConfig.mapDotStepSize)
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
     */
    showMarker(x, y, kw) {
        this.lastHighlightedDot = [x, y];
        this.mapPoint = document.querySelector(`circle[cx="${x}"][cy="${y}"]`);

        if (this.mapPoint) {
            this.mapPoint.classList.add('gridmap-dot-selected');

            this.kwText.innerHTML = kw;

            this.markerHolder.style.left = `${(x - 50)}px`;
            this.markerHolder.style.top = `${(y - 50)}px`;
            this.markerHolder.classList.remove('hidden');

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
            this.mapPoint = document.querySelector(
                `circle[cx="${this.lastHighlightedDot[0]}"][cy="${this.lastHighlightedDot[1]}"]`,
            );
            if (this.mapPoint) {
                this.mapPoint.classList.remove('gridmap-dot-selected');
            }
        }

        this.markerHolder.classList.add('hidden');
        this.markerCircleHolder.classList.remove('ev-map-wrap__bulge-appear');
        /* eslint no-void: "off" */
        void this.markerHolder.offsetWidth; // force DOM reflow to result bulge class

        this.lastHighlightedDot = [];
    }

    /**
     * Convert latitude and longitude to a dot on the map
     * (adapted from http://stackoverflow.com/a/27313080)
     *
     * @param latitute
     * @param longitude
     * @param kw
     */
    showChargeOnMap(latitude, longitude, kw) {
        const mapLonDelta = mapConfig.mapLonRight - mapConfig.mapLonLeft;
        const mapLatBottomDegree = (mapConfig.mapLatBottom * Math.PI) / 180;

        const x = (longitude - mapConfig.mapLonLeft) * (mapConfig.mapWidth / mapLonDelta);
        const latitudeNew = (latitude * Math.PI) / 180;
        const worldMapWidth = ((mapConfig.mapWidth / mapLonDelta) * 360) / (2 * Math.PI);
        const mapOffsetY = ((worldMapWidth / 2) * Math.log((1 + Math.sin(mapLatBottomDegree))
            / (1 - Math.sin(mapLatBottomDegree))));
        const y = mapConfig.mapHeight - (((worldMapWidth / 2) * Math.log((1 + Math.sin(latitudeNew))
            / (1 - Math.sin(latitudeNew)))) - mapOffsetY);

        const dotX = roundNumberTo(x, mapConfig.mapDotStepSize);
        const dotY = roundNumberTo(y, mapConfig.mapDotStepSize);

        this.showMarker(dotX, dotY, kw);
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
    init: element => {
        instances.push(new EvMap(element));
    },
};
