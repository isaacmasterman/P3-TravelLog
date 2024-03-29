import React, { useState } from 'react';
import { Alert, AlertIcon, Image, Flex, Input, Button, Center } from '@chakra-ui/react';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setError] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      Auth.login(data.login.token);
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (!email.trim() || !password.trim()) {
      setError('Email and password cannot be empty.');
      return;
    }    

    login({ variables: { email, password } });
  };

  return (
    <Center bg="#EBEBEB" w="100vw" h="100vh">
      <Flex direction="column" align="center" justify="center">
        {error && (
          <Alert status="error">
            <AlertIcon />
            {errorMsg || error.message}
          </Alert>
        )}
        <Image src={TravelLogLogo} alt="Travel Log Logo" my="2" w="100%" maxW="600px"/>
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
          onChange={(e) => {
            setEmail(e.target.value);
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
          onClick={handleLogin}
          isLoading={loading}
        >
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
          onClick={() => navigate('/signup')}
        >
          Signup
        </Button>
      </Flex>
    </Center>
  );
};

export default LoginPage;
