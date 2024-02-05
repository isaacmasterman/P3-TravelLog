import React, { useState } from 'react';
import { Alert, AlertIcon, Image, Flex, Input, Button, Center } from '@chakra-ui/react';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMsg, setError] = useState('');

  const [signup, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      Auth.login(data.createUser.token);
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formState.username.trim() || !/\S+@\S+\.\S+/.test(formState.email) || !formState.password.trim()) {
      setError('Please fill out all fields correctly.');
      return;
    }    

    signup({ variables: { ...formState } });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
    setError(''); // Clear any errors when the user starts typing
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
          name="username"
          type="text" 
          my="1" 
          bg="#FFFFFF" 
          borderColor="#292F33" 
          borderRadius="full" 
          w="100%" 
          maxW="400px" 
          value={formState.username} 
          onChange={handleChange} />
        <Input 
          placeholder="Email" 
          name="email"
          type="email" 
          my="1" 
          bg="#FFFFFF" 
          borderColor="#292F33" 
          borderRadius="full" 
          w="100%" 
          maxW="400px" 
          value={formState.email} 
          onChange={handleChange} />
        <Input 
          placeholder="Password" 
          name="password"
          type="password" 
          my="1" 
          bg="#FFFFFF" 
          borderColor="#292F33" 
          borderRadius="full" 
          w="100%" 
          maxW="400px" 
          value={formState.password} 
          onChange={handleChange} />
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
