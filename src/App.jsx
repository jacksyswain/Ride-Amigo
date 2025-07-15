// src/App.jsx
import React, { useEffect, useState } from "react";
import MapContainer from "./components/MapContainer";
import SOSButton from "./components/SOSButton";
import NearbyServices from "./components/NearbyServices";
import { getCurrentLocation } from "./services/locationService";
import { useSelector } from 'react-redux';
import data from "./data/locations.json";
import SOSSettings from './components/SOSSettings';

function App() {
  const [location, setLocation] = useState(null);
   const sosNumbers = useSelector((state) => state.sos.numbers);

  useEffect(() => {
    getCurrentLocation().then(({ latitude, longitude }) => {
      setLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>🚨 Highway SOS App</h1>
       <div style={{ maxWidth: '600px', margin: '2em auto', padding: '2em', fontFamily: 'Arial, sans-serif', background: '#fff', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#e60000' }}>🚨 SOS Driver App</h1>

      {/* Conditional display: show SOSSettings only if no numbers */}
      {sosNumbers.length === 0 ? (
        <SOSSettings />
      ) : (
        <>
          <h3 style={{ color: '#007bff' }}>✅ SOS WhatsApp numbers already saved.</h3>
        </>
      )}

      {/* Always show button */}
      <SOSButton />

      {/* Always show list + option to remove numbers */}
      {sosNumbers.length > 0 && <SOSSettings />}
    </div>
      {location && (
        <MapContainer currentLocation={location} locations={data} />
      )}
      <NearbyServices />
    </div>
  );
}

export default App;
