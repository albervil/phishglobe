import * as React from "react"
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet'

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export interface PhishMapProps {
    phishlist: Array<any>
}
export interface PhishMapState {
    lat: number,
    lon: number,
    zoom: number
}

export class PhishMap extends React.Component<PhishMapProps, PhishMapState> {
    constructor() {
        super();
        this.state = {
            lat: 0,
            lon: 0,
            zoom: 2
        };
    }

    public render() {
        let position = new LatLng(this.state.lat, this.state.lon);

        return (
            <div>
                <Map
                    center={position}
                    zoom={this.state.zoom}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
               </Map>
            </div>
        )
    }
}