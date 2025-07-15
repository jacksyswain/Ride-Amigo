import React, { useEffect, useState } from "react";
import data from "../data/locations.json";
import { getDistance } from "../services/distanceUtil";
import { getCurrentLocation } from "../services/locationService";

export default function NearbyServices() {
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    async function fetchNearby() {
      try {
        const { latitude, longitude } = await getCurrentLocation();

        const enriched = data.map((loc) => ({
          ...loc,
          distance: getDistance(latitude, longitude, loc.latitude, loc.longitude),
        }));

        const nearest = enriched
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 10); // 🟢 Show only 10 nearest

        setNearby(nearest);
      } catch (error) {
        console.error("Location error:", error);
      }
    }

    fetchNearby();
  }, []);

  return (
    <div style={{ marginTop: "2em" }}>
      <h2>🧭 10 Nearest Services</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {nearby.map((place, index) => (
          <li
            key={index}
            style={{
              marginBottom: "1em",
              background: "#f9f9f9",
              padding: "1em",
              borderRadius: "10px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <strong>{place.name}</strong> <br />
            📍 {place.address} <br />
            🚗 {place.distance.toFixed(2)} km –{" "}
            <span style={{ color: "#888" }}>{place.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}