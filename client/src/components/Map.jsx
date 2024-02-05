import React, { useState, useMemo, useCallback } from 'react';
import PlacesAutocomplete from './placesAutocomplete';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1600px',
  height: '800px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4"
      })
    
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

    // const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
    const [selected, setSelected] = useState(null);
    
    const panTo = useCallback(({ lat, lng }) => {
        if (map) {
          map.panTo({ lat, lng });
          map.setZoom(15); // You can adjust the zoom level as needed
        }
      }, [map]);
    
      const something = useCallback((value) => {
        console.log(value);
        setSelected(value);
        panTo(value);
      }, [panTo]);
    
      return isLoaded ? (
        <>
          <div className="places-container">
            <PlacesAutocomplete
              something={something}
              setSelected={setSelected}
              panTo={panTo}
            />
          </div>
    
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </>
      ) : (
        <></>
      );
    }
    
    export default React.memo(Map);

// // This one i was experimenting with to display the Card.
// import React, { useState } from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
// import PlacesAutocomplete from './placesAutocomplete';
// import PlaceComponent from './PlaceComponent';

// const Map = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4"
//   });

//   const [map, setMap] = useState(null);
//   const [selectedPlace, setSelectedPlace] = useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback() {
//     setMap(null);
//   }, []);

//   const handlePlaceSelect = place => {
//     setSelectedPlace(place);
//   };

//   const panTo = ({ lat, lng }) => {
//     if (map) {
//       map.panTo({ lat, lng });
//       map.setZoom(15);
//     }
//   };

//   const handleMarkerClick = (place) => {
//     setSelectedPlace(place);
//   };

//   return isLoaded ? (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={handlePlaceSelect} panTo={panTo} />
//       </div>

//       <GoogleMap
//         mapContainerStyle={{
//           width: '1600px',
//           height: '800px',
//         }}
//         center={{
//           lat: -3.745,
//           lng: -38.523,
//         }}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         {/* Your markers */}
//         {/* Example: */}
//         <Marker
//           position={{ lat: -3.75, lng: -38.52 }}
//           onClick={() => handleMarkerClick({ lat: -3.75, lng: -38.52, place_id: 'examplePlaceId' })}
//         />

//         {/* Display InfoWindow if a place is selected */}
//         {selectedPlace && (
//           <InfoWindow
//             position={selectedPlace}
//             onCloseClick={() => setSelectedPlace(null)}
//           >
//             <div style={{ width: '300px', height: '300px' }}>
//               <PlaceComponent placeId={selectedPlace.place_id} />
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </>
//   ) : (
//     <div>Loading...</div>
//   );
// };

// export default React.memo(Map);
