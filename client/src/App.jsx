import React, { useEffect } from 'react';
// import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'; Since you are now using routing, you might want to move the Google Maps logic to a separate component and include that component in the relevant route.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

// function App() {
//   const position = { lat: 61.2176, lng: -149.8997 };

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAkyntthEVNFhKJSJyWaUg4YeNXX1gv58c&libraries=maps&callback=initMap`;
//     script.async = true;
//     script.defer = true;

//     window.initMap = () => {
//       // Optionally, you can perform additional map initialization here if needed
//       console.log('Map initialized');
//     };

//     script.onload = () => {
//       window.initMap();
//     };

//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//       delete window.initMap;
//     };
//   }, []);

//   return (
//     <APIProvider apiKey={'AIzaSyAkyntthEVNFhKJSJyWaUg4YeNXX1gv58c'}>
//       <Map center={position} zoom={10}>
//         <Marker position={position} />
//       </Map>
//     </APIProvider>
//   );
// }

// export default App;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;