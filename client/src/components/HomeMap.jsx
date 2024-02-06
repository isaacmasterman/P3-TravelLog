import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import Map from './map';
import Navbar from './Navbar';
import ListComponent from './listsComponent';
import PlacesAutocomplete from './placesAutocomplete';

import PlaceCard from './PlaceCard';
import usePlaceDetails from '../utils/usePlaceDetails';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { useDrawerContext } from './DrawerContext';
const libraries = ["places"];
const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;


export default function HomeMap() {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey, libraries });
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const { placeDetails, isLoading, error } = usePlaceDetails(selectedPlaceId, apiKey);
  const { isDrawerOpen, toggleDrawer } = useDrawerContext()

  const handleSelectPlace = (place) => {
    if (place && place.place_id && place.place_id !== selectedPlaceId) {
      console.log("Selected Place ID:", place.place_id);
      setSelectedPlaceId(place.place_id);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
    <Navbar />
    {isDrawerOpen && <ListComponent />}
    <Flex direction="row" height={`calc(100vh - 80px)`}>
        <Box flex="1" overflowY="auto" >
          {placeDetails && <PlaceCard placeData={placeDetails} />}
        </Box>

        <Box flex="3">
          <PlacesAutocomplete onSelectPlace={handleSelectPlace} />
          <Map />
          {isLoading && <Spinner />}
          {error && <Text color="red.500">{error}</Text>}
        </Box>
      </Flex>
    </>
  );
}
