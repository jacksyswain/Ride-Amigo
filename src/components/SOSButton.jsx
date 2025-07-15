import React from 'react';
import { useSelector } from 'react-redux';

export default function SOSButton() {
  const numbers = useSelector((state) => state.sos.numbers);

  const handleSOS = () => {
    if (!numbers.length) {
      alert("⚠️ No SOS numbers found. Please add one.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const message = encodeURIComponent(
          `🚨 EMERGENCY!\nDriver needs help.\n📍 Location: https://maps.google.com?q=${latitude},${longitude}`
        );
        numbers.forEach((num) => {
          const link = `https://wa.me/${num}?text=${message}`;
          window.open(link, '_blank');
        });
      },
      (err) => alert("Failed to fetch location: " + err.message),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <button
        onClick={handleSOS}
        style={{
          backgroundColor: "#e60000",
          color: "white",
          padding: "1em 2em",
          fontSize: "1.2rem",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        🚨 Send SOS
      </button>
    </div>
  );
}