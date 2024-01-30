import React, { useState } from 'react';
import { Flex, Input, Button, Image, Center } from '@chakra-ui/react';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Add function to handle form submission here
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!username.trim()) {
        setError('Username cannot be empty.');
        return;
    } else if (!/\S+@\S+\.\S+/.test(email) && location.pathname === '/signup') {
        setError('Invalid email format.');
        return;
    } else if (!password.trim()) {
        setError('Password cannot be empty.');
        return;
    }    
  
    try {
      // Make POST request to backend
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
  
      const data = await response.json();
      if (!response.ok) {
        // Handle error - e.g., display an error message from the response
        return;
      }

        // Store JWT received from the server
        localStorage.setItem('token', data.token);

        // Redirect to another page after successful signup
        navigate('/login');
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
        <Image src={TravelLogLogo} boxSize="200px" alt="Travel Log Logo" />
        <Input 
            placeholder="Username"
            type="text" 
            my="2" 
            bg="#FFFFFF" 
            borderColor="#292F33" 
            borderRadius="md"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
                setError('');
            }}         
        />
        <Input
            placeholder="Email"
            type="email" 
            my="2" 
            bg="#FFFFFF" 
            borderColor="#292F33" 
            borderRadius="md"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                setError('');
            }}    
        />
        <Input
            placeholder="Password" 
            type="password" 
            my="2" 
            bg="#FFFFFF" 
            borderColor="#292F33" 
            borderRadius="md"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setError('');
            }}    
        />
        <Button 
            bg="#292F33" 
            color="#EBEBEB" 
            my="2" 
            _hover={{ bg: "#898989" }} 
            onClick={ handleSubmit }>
                Signup
        </Button>
        <Button 
            bg="#292F33" 
            color="#EBEBEB" 
            my="2" 
            _hover={{ bg: "#898989" }} 
            onClick={() => navigate('/login')}>
                Login
        </Button>
      </Flex>
    </Center>
  );
};

export default SignupPage;
