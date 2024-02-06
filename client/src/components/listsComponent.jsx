import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LISTS } from '../utils/queries';
import { CREATE_LIST } from '../utils/mutations';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

  const ListComponent = () => {
    const { loading, data } = useQuery(GET_LISTS);
    const [createList] = useMutation(CREATE_LIST);
    const [newListTitle, setNewListTitle] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleCreateList = async () => {
      await createList({ variables: { title: newListTitle } });
      setNewListTitle('');
      onClose(); // Close the drawer after creating a list
    };
  
    if (loading) return <p>Loading...</p>;
  
    return (
      <>
        <Button colorScheme="blue" onClick={onOpen}>
          Create New List
        </Button>
        {data.lists.map((list) => (
          <div key={list.id}>
            <h2>{list.title}</h2>
            {/* Display locations if any */}
          </div>
        ))}
        <Drawer size="lg" placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create a new list</DrawerHeader>
            <DrawerBody>
              <Input
                placeholder="List Title"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
              />
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleCreateList}>
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  
  export default ListComponent;
  