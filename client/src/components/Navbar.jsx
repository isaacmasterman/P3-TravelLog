import React from 'react';
import { Box, Flex, Image, Button, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png'; // Make sure the path is correct

const Navbar = () => {
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
          as={Link} 
          to="/lists" 
          color="#292F33"
          variant="ghost"
          _hover={{ bg: "#f0f0f0" }}
          marginLeft="2"
        >
          Lists
        </Button>
        <Divider orientation="vertical" borderColor="#292F33" h="30px" />
        <Button 
          as={Link} 
          to="/logout" 
          color="#292F33"
          variant="ghost"
          _hover={{ bg: "#f0f0f0" }}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
