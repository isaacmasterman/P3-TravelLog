import React, { useState } from 'react';
import { Flex, Input, Button, Image, Center } from '@chakra-ui/react';
import TravelLogLogo from '../assets/Images/TravelLog_Logo.png';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Add function to handle form submission here

  return (
    <Center bg="#EBEBEB" w="100vw" h="100vh">
      <Flex direction="column" align="center" justify="center">
        <Image src={TravelLogLogo} boxSize="200px" alt="Travel Log Logo" />
        <Input 
            placeholder="Username"
            type="text" 
            my="2" 
            bg="#FFFFFF" 
            borderColor="#292F33" 
            borderRadius="md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <Input
            placeholder="Email"
            type="email" 
            my="2" 
            bg="#FFFFFF" 
            borderColor="#292F33" 
            borderRadius="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <Input
            placeholder="Password" 
            type="password" 
            my="2" 
            bg="#FFFFFF" 
            borderColor="#292F33" 
            borderRadius="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
            bg="#292F33" 
            color="#EBEBEB" 
            my="2" 
            _hover={{ bg: "#898989" }} 
            onClick={/* form submission function here */}>
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
