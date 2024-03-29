import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Image, Button, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png'; // Make sure the path is correct
import ListComponent from './listsComponent';
import { useDrawerContext } from './DrawerContext';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    localStorage.removeItem('id_token'); // Remove the token from localStorage
    navigate('/'); // Redirect to the homepage or login page after logout
    // If using Apollo Client, consider resetting the store here
    // e.g., client.resetStore() or client.clearStore()
  };

  const { isDrawerOpen, toggleDrawer } = useDrawerContext();
  return (
    <Flex
      bg="#EBEBEB"
      px={4}
      h="80px" // Adjust the height as needed
      w="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image 
        src={TravelLogLogo} 
        alt="Travel Log Logo" 
        my={2}
        w="100%"
        maxW="200px"
      />

      <Flex alignItems="center">
        <Divider orientation="vertical" borderColor="#292F33" h="30px" />
        <Button 
          onClick={toggleDrawer}
          color="#292F33"
          variant="ghost"
          _hover={{ bg: "#f0f0f0" }}
          marginLeft="2"
        >
          {isDrawerOpen ? 'Close Drawer' : 'Open Drawer'}
          Lists
        </Button>
        <Divider orientation="vertical" borderColor="#292F33" h="30px" />
        <Button 
          color="#292F33"
          variant="ghost"
          _hover={{ bg: "#f0f0f0" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
