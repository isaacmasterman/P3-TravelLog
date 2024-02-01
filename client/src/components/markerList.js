// MarkerList.js
import React from 'react';
import Marker from './marker';

const MarkerList = ({ markers }) => {
  return (
    <div>
      <h2>My Markers</h2>
      <ul>
        {markers.map((marker, index) => (
          <li key={index}>
            <Marker position={marker.position} label={marker.label} type={marker.type} />
            {marker.label} ({marker.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkerList;
