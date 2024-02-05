// import React, { useState, useMemo, useCallback } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

// export default function Places() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4",
//     libraries: ["places"],
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }
// function Map() {
//   const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
//   const [selected, setSelected] = useState(null);

//   return (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>

//       <GoogleMap
//         zoom={10}
//         center={center}
//         mapContainerClassName="map-container"
//       >
//         {selected && <Marker position={selected} />}
//       </GoogleMap>
//     </>
//   );
//   }


// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleInput = e => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("😱 Error: ", error);
//     }

//   //   const results = await getGeocode({ address });
//   //   const { lat, lng } = await getLatLng(results[0]);
//   //   setSelected({ lat, lng });
//   };
//   const [markers, setMarkers] = React.useState([]);

//   const onMapClick = React.useCallback(e => {
//     setMarkers(current => [
//       // ...current,
//       {
//         lat: e.latLng.lat(),
//         lng: e.latLng.lng(),
//         time: new Date()
//       }
//     ]);
//   }, []);

//   const mapRef = React.useRef();
//   const onMapLoad = React.useCallback(map => {
//     mapRef.current = map;
//   }, []);

//   const panTo = React.useCallback(({ lat, lng }) => {
//     mapRef.current.panTo({ lat, lng });
//     mapRef.current.setZoom(14);
//     setMarkers(current => [
//       // ...current,
//       {
//         lat,
//         lng,
//         time: new Date()
//       }
//     ]);
//   }, []);

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={handleInput}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };

"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function intro() {
  const position = { lat: 53.54, lng: 10 };

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position}></Map>
      </div>
    </APIProvider >
  );
}