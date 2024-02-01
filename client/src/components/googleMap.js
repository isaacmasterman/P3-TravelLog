import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = ({ apiKey }) => {
  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: -34.397,
    lng: 150.644
  };

  const handleLoad = (map) => {
    // Handle map load
    console.log('Map loaded:', map);
  };

  const handleError = (error) => {
    // Handle map load error
    console.error('Error loading map:', error);
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      onLoad={handleLoad}
      onError={handleError}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
      />
    </LoadScript>
  );
};

export default MapContainer;
