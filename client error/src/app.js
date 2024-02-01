import React from 'react';
import MapContainer from './components/googleMap'; 
const App = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div>
      <h1>Travel Log</h1>
      <MapContainer apiKey={apiKey} />
    </div>
  );
};

export default App;
