import React, { useState, useMemo, useCallback, useEffect } from 'react'; // Added useEffect import here
import PlacesAutocomplete from './PlacesAutocomplete';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const NAVBAR_HEIGHT = '80px'; // Adjust based on actual navbar height

const center = {
  lat: 0, 
  lng: 0  
};

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4"
    });
    
    const [mapHeight, setMapHeight] = useState(`calc(100vh - ${NAVBAR_HEIGHT})`);

    // Adjust map height dynamically if needed
    useEffect(() => {
        function updateMapHeight() {
            setMapHeight(`calc(100vh - ${NAVBAR_HEIGHT})`);
        }

        window.addEventListener('resize', updateMapHeight);
        return () => window.removeEventListener('resize', updateMapHeight);
    }, []);

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        map.setCenter(center);
        map.setZoom(2);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const [selected, setSelected] = useState(null);

    const panTo = useCallback(({ lat, lng }) => {
        if (map) {
            map.panTo({ lat, lng });
            map.setZoom(13); // You can adjust the zoom level as needed
        }
    }, [map]);

    const something = useCallback((value) => {
        console.log(value);
        setSelected(value);
        panTo(value);
    }, [panTo]);

    const containerStyle = {
        width: '100vw',
        height: mapHeight // Use the dynamic height here
    };

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
                zoom={13}
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
