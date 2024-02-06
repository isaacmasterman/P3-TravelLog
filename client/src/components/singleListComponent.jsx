import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_LIST } from '../utils/queries';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Text,
  Box,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';


const SingleListComponent = ({ listId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id: listId },
    onCompleted: () => onOpen(), // Automatically open the drawer when data is loaded
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { list } = data;

  return (
    <>
      <Button onClick={onOpen}>View List Details</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{list.title}</DrawerHeader>

          <DrawerBody>
            <Text mb="4">{list.description}</Text>
            <Box as="section">
              <Text fontSize="lg" fontWeight="bold" mb="2">
                Locations:
              </Text>
              <List spacing={3}>
                {list.locations.map((location) => (
                  <ListItem key={location._id} d="flex" alignItems="center">
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    <Text as="span">
                      <strong>{location.name}</strong> - {location.description}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SingleListComponent;
