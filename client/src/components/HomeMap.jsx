// Import statements
import React, { useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import ListComponent from './listsComponent';
import PlacesAutocomplete from './PlacesAutocomplete';
import Map from './Map';
import PlaceCard from './PlaceCard';
import usePlaceDetails from '../utils/usePlaceDetails';
import { useDrawerContext } from './DrawerContext';

// Google Maps libraries
const libraries = ["places"];
const apiKey = "AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4";

export default function HomeMap() {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey, libraries });
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const { placeDetails, isLoading, error } = usePlaceDetails(selectedPlaceId, apiKey);
  const { isDrawerOpen, toggleDrawer } = useDrawerContext();
  const navigate = useNavigate(); // Use navigate from react-router-dom

  // Authentication check and redirection if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('id_token'); // Adjust this according to your token storage method
    if (!token) {
      navigate('/'); // Adjust the route as per your login route
    }
  }, [navigate]);

  const handleSelectPlace = (place) => {
    console.log("Selected Place ID:", place.place_id);
    setSelectedPlaceId(place.place_id);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      {isDrawerOpen && <ListComponent />}
      <Flex direction="row" height={`calc(100vh - 80px)`}>
        <Box flex="1" overflowY="auto">
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

