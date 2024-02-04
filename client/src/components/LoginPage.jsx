import React, { useState } from 'react';
import { Alert, AlertIcon, Image, Flex, Input, Button, Center } from '@chakra-ui/react';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setError] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      navigate('/map'); // Adjust the navigation target as needed
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (!username.trim() || !password.trim()) {
      setError('Username and password cannot be empty.');
      return;
    }    

    login({ variables: { email: username, password } });
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
