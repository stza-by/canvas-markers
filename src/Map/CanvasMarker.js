import React from "react";
import L from 'leaflet';
import {CircleMarker} from "react-leaflet";

export default class CanvasMarker extends CircleMarker {

    createLeafletElement(props) {
        return new L.canvasMarker(props.center, this.getOptions(props))
    }

    updateLeafletElement(fromProps, toProps) {
        if (toProps.center !== fromProps.center) {
            this.leafletElement.setLatLng(toProps.center)
        }
    }
}