import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Select, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import PlacesAutocomplete from './PlacesAutocomplete';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PlaceComponent from './PlaceComponent';
import { ADD_LOCATION } from '../utils/mutations';
import { GET_LISTS } from '../utils/queries';


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

  const { data: listData, loading: listLoading } = useQuery(GET_LISTS);
  const [addLocation] = useMutation(ADD_LOCATION);
  const [mapHeight, setMapHeight] = useState(`calc(100vh - ${NAVBAR_HEIGHT})`);
  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedList, setSelectedList] = useState('');
  const select = localStorage.getItem("results")
  console.log(select)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  console.log("Selected" + selected)
  console.log('Selected object:', selected);

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

  const handleAddLocation = async () => {
    if (selected && selectedList) {
      console.log('Select object:', select);
      try {
        await addLocation({
          variables: {
            listId: selectedList,
            locationId: selected._id,
            locationName: selected.address,
            locationDescription: selected.locationDescription,
          },
        });
        console.log('Location added successfully');
        setIsDrawerOpen(false);
      } catch (error) {
        console.error('Error adding location:', error);
      }
    }
  };

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
            <PlaceComponent place={selected} />
              {listLoading ? (
                <div>Loading Lists...</div>
              ) : (
                <Select placeholder='Select list' value={selectedList} onChange={e => setSelectedList(e.target.value)} mb='4'>
                  {listData.lists.map(list => (
                    <option key={list._id} value={list._id}>
                      {list.listTitle}
                    </option>
                  ))}
                </Select>
              )}
              <Button colorScheme='teal' size='md' onClick={handleAddLocation}>
                Add to List
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


