import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

const PlacesAutocomplete = ({ setSelected, panTo, onSelectPlace }) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
    
      try {
        console.log("Geocoding address:", address);
        const results = await getGeocode({ address });
        console.log(results)
        localStorage.setItem("results", results[0].place_id);
        const { lat, lng } = await getLatLng(results[0]);
        console.log("Geocode success:", { lat, lng });
        const selectedLocation = { lat, lng, address };
        panTo(selectedLocation); 
        setSelected(selectedLocation);
    
        if (onSelectPlace) {
          console.log("About to call onSelectPlace with:", { ...results[0], lat, lng });
          onSelectPlace({ ...results[0], lat, lng });
        } else {
          console.log("onSelectPlace not defined");
        }        
      } catch (error) {
        console.error("Error in handleSelect:", error);
      }
    };    
  
    return (
        <Box position="absolute" left="50%" top="20%" transform="translateX(-50%)" width="90%" maxWidth="600px" zIndex="10">
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={SearchIcon} color="gray.300" />}
                />
                <Input
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Where will you explore next?"
                    size="lg"
                    borderRadius="full"
                    bg="#EBEBEB"
                />
            </InputGroup>
            {status === "OK" && (
                <Box backgroundColor="white" borderRadius="md" boxShadow="md" mt="1">
                    {data.map(({ place_id, description }) => (
                        <Box key={place_id} p="2" borderBottomWidth="1px" style={{ cursor: 'pointer' }} onClick={() => handleSelect(description)}>
                            {description}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};
  
export default PlacesAutocomplete;
