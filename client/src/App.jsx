import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import GoogleMap from './components/googleMap'; 


// HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  uri: '/graphql', // Adjust if your GraphQL endpoint differs
});

// Middleware for setting the auth token with each request
const authLink = setContext((_, { headers }) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the auth link and the http link
  cache: new InMemoryCache(),
});

function App() {
  return (

    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
