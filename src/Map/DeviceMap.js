import React, {Component} from 'react';
import {Map, TileLayer, CircleMarker, Popup, Tooltip, FeatureGroup} from 'react-leaflet';
import L from 'leaflet';
import extendLeafletCanvas from "./leaflet-canvas-markers";
import "leaflet/dist/leaflet.css";
import CanvasMarker from "./CanvasMarker";
import img_path from './img/icon.png'

extendLeafletCanvas(L);


class DeviceMap extends Component {
    renderMarkers() {
        const dataLength = 10000;
        const data = Array(...Array(dataLength)).map((_, i) => (
            {pos: [22.5774626732038 + Math.random() - 0.5, 114.04924392700197 + Math.random() - 0.5], num: i}
        ));
        return data.map((item) => {
            return (<CanvasMarker
                key={item.num}
                radius={10}
                center={item.pos}
                img={{url: img_path, size: [20, 20]}}>
                <Popup>
                    <div><strong>num：</strong><span>{item.num}</span></div>
                </Popup>
                {/*<Tooltip>{"HAHAH"}</Tooltip>*/}
            </CanvasMarker>);
        });
    }

    render() {
        return (
            <Map
                center={[22.5774626732038, 114.04924392700197]}
                zoom={16}
                preferCanvas={true}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <FeatureGroup
                    onClick={(e) => console.log('onClick')}
                    onMouseOver={() => {
                        console.log('OnMouseOver')
                    }}
                    onMouseOut={() => {
                        console.log('OnMouseOut')
                    }}
                    onContextMenu={(e) => console.log('onContextMenu')}>
                    {this.renderMarkers()}
                </FeatureGroup>
            </Map>
        );
    }
}

export default DeviceMap;