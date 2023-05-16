'use client';

import Leaflet from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete Leaflet.Icon.Default.prototype._getIconUrl; 
Leaflet.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[]
}

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<MapProps> = ({ center }) => {
  return (
      <MapContainer 
        center={center as Leaflet.LatLngExpression || [51, -0.09]} 
        zoom={center ? 4 : 2} 
        scrollWheelZoom={false} 
        className="h-[35vh] rounded-lg"
      >
        <TileLayer
          url={TILE_URL}
          attribution={TILE_ATTRIBUTION}
        />
        {center && (
          <Marker position={center as Leaflet.LatLngExpression} />
        )}
      </MapContainer>
  )
}

export default Map