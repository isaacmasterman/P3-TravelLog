import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Map from './Map';
import Navbar from './Navbar';
import PlacesAutocomplete from './PlacesAutocomplete';
import PlaceCard from './PlaceCard';
import usePlaceDetails from '../utils/usePlaceDetails';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

const libraries = ["places"];
const apiKey = "AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4";

export default function HomeMap() {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey, libraries });
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const { placeDetails, isLoading, error } = usePlaceDetails(selectedPlaceId, apiKey);

  const handleSelectPlace = (place) => {
    console.log("Selected Place ID:", place.place_id);
    setSelectedPlaceId(place.place_id);
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
    <Navbar />
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


