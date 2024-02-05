import React from 'react';
import { Box, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react';

const PlaceCard = ({ placeData }) => {
  const { name, description, rating, photos } = placeData;

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {photos && photos.length > 0 && (
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4`}
          alt={name}
          borderRadius="lg"
        />
      )}

      <Stack mt="6" spacing="3">
        <Heading size="md">{name}</Heading>
        <Text>{description || 'No description available'}</Text>
        {rating && <Text color="blue.600" fontSize="2xl">Rating: {rating}</Text>}
      </Stack>

      <Divider />

      <ButtonGroup spacing="2">
        <Button variant="solid" colorScheme="blue">
          Buy now
        </Button>
        <Button variant="ghost" colorScheme="blue">
          Add to cart
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default PlaceCard;
