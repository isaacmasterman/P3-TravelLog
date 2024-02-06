import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LISTS } from '../utils/queries';
import { CREATE_LIST } from '../utils/mutations';
import { Button, Input, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { useDrawerContext } from './DrawerContext';

const ListComponent = () => {
  const { loading, data } = useQuery(GET_LISTS);
  const [createList, { refetch }] = useMutation(CREATE_LIST, { refetchQueries: [GET_LISTS] });
  const [listTitle, setNewListTitle] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const { isDrawerOpen, toggleDrawer } = useDrawerContext();

  const handleCreateList = async () => {
    await createList({ variables: { listTitle } });
    setNewListTitle('');
    toggleDrawer();
    refetch();
  };

  const handleListSelect = (list) => {
    setSelectedList(list);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Drawer size="lg" placement="left" onClose={toggleDrawer} isOpen={isDrawerOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Lists</DrawerHeader>
        <DrawerBody>
          {!selectedList && (
            <VStack align="start" spacing={4}>
              {data?.lists?.map((list) => (
                <Box key={list.id} p={2} w="full" borderWidth="1px" borderRadius="lg" _hover={{ bg: "gray.100" }} onClick={() => handleListSelect(list)}>
                  <Heading size="md">{list.listTitle}</Heading>
                  <Text>{list.listDescription}</Text>
                </Box>
              ))}
            </VStack>
          )}
          {selectedList && (
            <Box>
              <Button mb={4} onClick={() => setSelectedList(null)}>Back to Lists</Button>
              <Heading size="lg" mb={2}>Locations in {selectedList.listTitle}</Heading>
              <VStack align="start" spacing={3}>
                {selectedList.locations.map(location => (
                  <HStack key={location.id} spacing={4}>
                    <Text fontWeight="bold">{location.locationName}</Text>
                    <Text>{location.locationDescription}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          )}
        </DrawerBody>
        <DrawerFooter>
          {selectedList ? null : (
            <>
              <Input placeholder="New List Title" value={listTitle} onChange={(e) => setNewListTitle(e.target.value)} />
              <Button variant="outline" mr={3} onClick={toggleDrawer}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleCreateList}>Save</Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ListComponent;

