import React from 'react';
import { Box, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';

const PlaceCard = ({ placeData }) => {
  console.log("PlaceCard props:", placeData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, description, photos } = placeData; // Assuming `placeData` has these fields

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

  return (
    <Box bg="#EBEBEB" p={5} shadow="md" borderWidth="1px">
      {photos && photos.length > 0 && (
        <Image src={photos[0]} alt={name} />
      )}
      <Heading fontSize="xl">{name}</Heading>
      <Text mt={4}>{description || 'No description available'}</Text>
      <ButtonGroup variant="outline" spacing="6" marginTop="4">
        <Button leftIcon={<AddIcon />} onClick={handleSave}>Save</Button>
        <Button rightIcon={<ExternalLinkIcon />} onClick={handleDirections}>Directions</Button>
      </ButtonGroup>
    </Box>
  );
};

export default PlaceCard;
