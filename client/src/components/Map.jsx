import React, { useState, useCallback, useEffect } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody } from '@chakra-ui/react';
import PlacesAutocomplete from './placesAutocomplete';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PlaceComponent from './PlaceComponent';
import { Button, ButtonGroup } from '@chakra-ui/react'



const NAVBAR_HEIGHT = '80px'; // Adjust based on actual navbar height

const center = {
  lat: 0,
  lng: 0
};

const Map = () => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [mapHeight, setMapHeight] = useState(`calc(100vh - ${NAVBAR_HEIGHT})`);
  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(null);
  const select = localStorage.getItem("results")
  console.log(select)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  console.log("Selected" + selected)


  useEffect(() => {
    function updateMapHeight() {
      setMapHeight(`calc(100vh - ${NAVBAR_HEIGHT})`);
    }

    window.addEventListener('resize', updateMapHeight);
    return () => window.removeEventListener('resize', updateMapHeight);
  }, []);

  const onLoad = useCallback(function callback(map) {
    map.setCenter(center);
    map.setZoom(2);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    if (map) {
      map.panTo({ lat, lng });
      map.setZoom(13);
    }
  }, [map]);

  const something = useCallback((value) => {
    console.log("Selected place:", value);  // Log selected place data
    setSelected(value);
    panTo(value);
    setIsDrawerOpen(true);
  }, [panTo]);

  const containerStyle = {
    width: '100vw',
    height: mapHeight
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
        {selected && <Marker position={selected} onClick={() => setIsDrawerOpen(true)} />}
      </GoogleMap>

      {selected && (
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          size="lg"
          onClose={() => setIsDrawerOpen(false)}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Place Details</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <PlaceComponent placeId={select} />
              <Button colorScheme='teal' size='md'>
                Add
              </Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(Map);


