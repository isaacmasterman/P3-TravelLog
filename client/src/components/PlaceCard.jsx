import React from 'react';
import { Box, Image, Heading, Text, Button, ButtonGroup, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from '@chakra-ui/react';
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';

const PlaceCard = ({ placeData, onSelectPlace }) => {
  console.log("PlaceCard props:", placeData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, description, photos } = placeData || {}; // Destructure with default value to prevent errors

  // Function to handle "Save" button action
  const handleSave = () => {
    console.log("Save action");
    // Implement the save functionality
  };

  // Function to handle "Directions" button action
  const handleDirections = () => {
    console.log("Directions action");
    // Implement the directions functionality (e.g., open Google Maps)
  };

  // Function to handle place selection
  const handleSelect = () => {
    if (onSelectPlace) {
      onSelectPlace(placeData);
    }
  };

  return (
    <Box bg="#EBEBEB" p={5} shadow="md" borderWidth="1px" onClick={handleSelect} style={{ cursor: 'pointer' }}>
      {photos && photos.length > 0 && (
        <Image src={photos[0]} alt={name} />
      )}
      <Heading fontSize="xl">{name}</Heading>
      <Text mt={4}>{description || 'No description available'}</Text>
      <ButtonGroup variant="outline" spacing="6" marginTop="4">
        <Button leftIcon={<AddIcon />} onClick={handleSave}>Save</Button>
        <Button rightIcon={<ExternalLinkIcon />} onClick={onOpen}>Directions</Button>
      </ButtonGroup>

      {/* Drawer component for Directions */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Directions</DrawerHeader>
          <DrawerBody>
            {/* Content for the Directions drawer */}
            {/* You can include a map, additional information, etc. */}
            <Text>Directions content goes here...</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default PlaceCard;
