import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../data/locations.json';
import { getCurrentLocation } from '../services/locationService';
import { getDistance } from '../services/distanceUtil';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

export default function OSMMap() {
  const [position, setPosition] = useState(null);
  const [nearestLocations, setNearestLocations] = useState([]);

  useEffect(() => {
    async function fetchLocationAndNearby() {
      try {
        const { latitude, longitude } = await getCurrentLocation();
        const currentPos = { lat: latitude, lng: longitude };
        setPosition(currentPos);

        // Add distance to each location
        const enriched = data.map(loc => ({
          ...loc,
          distance: getDistance(latitude, longitude, loc.latitude, loc.longitude)
        }));

        // Get 10 nearest
        const nearest = enriched
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 10);

        setNearestLocations(nearest);
      } catch (err) {
        console.error("Failed to fetch location", err);
      }
    }

    fetchLocationAndNearby();
  }, []);

  if (!position) return <p>📍 Getting your location...</p>;

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%', borderRadius: '12px', marginTop: '1em' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location */}
      <Marker position={position}>
        <Popup>📍 You are here</Popup>
      </Marker>

      {/* Nearest 10 garages/fuel */}
      {nearestLocations.map((loc, i) => (
        <Marker key={i} position={{ lat: loc.latitude, lng: loc.longitude }}>
          <Popup>
            <strong>{loc.name}</strong><br />
            {loc.type === 'fuel' ? '⛽ Fuel Station' : '🛠️ Garage'}<br />
            {loc.address}<br />
            🚗 {loc.distance.toFixed(2)} km
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}