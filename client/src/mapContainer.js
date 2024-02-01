// MapContainer.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Marker from './Marker';
import MarkerList from './MarkerList';
import MarkerTypes from './config/markerTypes';

const MapContainer = ({ apiKey }) => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: -34.397,
    lng: 150.644,
  };

  const initialMarkers = [
    { position: { lat: -34.397, lng: 150.644 }, label: 'Marker 1', type: MarkerTypes.LOVE },
    // Add more markers as needed
  ];

  const [markers, setMarkers] = useState(initialMarkers);

  const addMarker = (position, label, type) => {
    setMarkers([...markers, { position, label, type }]);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={8} center={defaultCenter}>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} label={marker.label} type={marker.type} />
        ))}
      </GoogleMap>
      <MarkerList markers={markers} />
      <button onClick={() => addMarker({ lat: -34.0, lng: 150.0 }, 'New Marker', MarkerTypes.FLAG)}>
        Add Marker
      </button>
    </LoadScript>
  );
};

export default MapContainer;
