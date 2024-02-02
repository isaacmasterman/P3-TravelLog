import React, { useState } from 'react';
import { Alert, AlertIcon, Image, Box, Flex, Input, Button, Text, Center } from '@chakra-ui/react';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png';
import { useNavigate } from 'react-router-dom';

// Import any other necessary components and hooks (authorisation)

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Add function to handle form submission here
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!username.trim()) {
        setError('Username cannot be empty.');
        return;
    } else if (!password.trim()) {
        setError('Password cannot be empty.');
        return;
    }    
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
      if (!response.ok) {
        // Handle login error
        return;
      }
  
        // Store JWT received from the server
        localStorage.setItem('token', data.token);

        // Redirect to another page after successful signup
        navigate('/map'); // Replace with desired route
    } catch (error) {
      // Handle network error
    }
  };
  

  return (
    <Center bg="#EBEBEB" w="100vw" h="100vh">
      <Flex direction="column" align="center" justify="center">
        {error && (
            <Alert status="error">
                <AlertIcon />
                {error}
            </Alert>
        )}
        <Image 
            src={TravelLogLogo} 
            alt="Travel Log Logo" 
            my="2"
            w="100%"
            maxW="600px"/>
        <Input 
            placeholder="Username" 
            type="text"
            my="1" 
            bg="#FFFFFF" 
            borderColor="#292F33" 
            borderRadius="full"
            w="100%"
            maxW="400px"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
                setError('');
            }}
        />
        <Input 
            placeholder="Password" 
            type="password" 
            my="1" 
            bg="#FFFFFF" 
            borderColor="#292F33" 
            borderRadius="full"
            w="100%"
            maxW="400px"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setError('');
            }}
        />
        <Button 
            bg="#292F33" 
            color="#EBEBEB" 
            my="1"
            borderRadius="full"
            w="100%"
            maxW="400px" 
            _hover={{ bg: "#898989" }} 
            onClick={ handleLogin }>
                Login
        </Button>
        <Button 
            bg="#292F33" 
            color="#EBEBEB" 
            my="1"
            borderRadius="full"
            w="100%"
            maxW="400px" 
            _hover={{ bg: "#898989" }} 
            onClick={() => navigate('/signup')}>
                Signup
        </Button>
      </Flex>
    </Center>
  );
};

export default LoginPage;
