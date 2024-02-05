import React, { useState } from 'react';
import { Alert, AlertIcon, Image, Flex, Input, Button, Center } from '@chakra-ui/react';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth'

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setError] = useState('');

  const [signup, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.createUser.token);
      navigate('/login'); // Adjust the navigation target as needed
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!username.trim() || !/\S+@\S+\.\S+/.test(email) || !password.trim()) {
      setError('Please fill out all fields correctly.');
      return;
    }    

    signup({ variables: { username, email, password } });
  };

  return (
    <Center bg="#EBEBEB" w="100vw" h="100vh">
      <Flex direction="column" align="center" justify="center">
        {errorMsg && (
          <Alert status="error">
            <AlertIcon />
            {errorMsg}
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
          onChange={(e) => setUsername(e.target.value)} />
        <Input 
          placeholder="Email" 
          type="email" 
          my="1" 
          bg="#FFFFFF" 
          borderColor="#292F33" 
          borderRadius="full" 
          w="100%" 
          maxW="400px" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        <Input 
          placeholder="Password" 
          type="password" 
          my="1" bg="#FFFFFF" 
          borderColor="#292F33" 
          borderRadius="full" 
          w="100%" 
          maxW="400px" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        <Button 
          bg="#292F33" 
          color="#EBEBEB" 
          my="1" 
          borderRadius="full" 
          w="100%" 
          maxW="400px" 
          _hover={{ bg: "#898989" }} 
          onClick={handleSubmit} 
          isLoading={loading}
        >
          Signup
        </Button>
        <Button 
          bg="#292F33" 
          color="#EBEBEB" 
          my="1" 
          borderRadius="full" 
          w="100%" 
          maxW="400px" 
          _hover={{ bg: "#898989" }} 
          onClick={() => navigate('/')}
        >
          Login
        </Button>
      </Flex>
    </Center>
  );
};

export default SignupPage;
