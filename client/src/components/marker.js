// Marker.js
import React from 'react';
import { Marker as GoogleMarker } from '@react-google-maps/api';
import MarkerTypes from './MarkerTypes';

const getIconForType = (type) => {
  switch (type) {
    case MarkerTypes.LOVE:
      return 'path/to/love-icon.png';
    case MarkerTypes.FLAG:
      return 'path/to/flag-icon.png';
    // Add more as needed
    default:
      return 'default-icon.png';
  }
};

const Marker = ({ position, label, type }) => {
  return (
    <GoogleMarker
      position={position}
      label={label}
      icon={{ url: getIconForType(type), scaledSize: new window.google.maps.Size(30, 30) }}
    />
  );
};

export default Marker;
