import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomeMap from './components/HomeMap';
import ListComponent from './components/listsComponent'; // Import the ListComponent
import { DrawerProvider } from './components/DrawerContext';


// HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:4000/graphql',
});


// Middleware for setting the auth token with each request
const authLink = setContext((_, { headers }) => {
  // Get the token from local storage
  const token = localStorage.getItem('id_token');
  
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

        <DrawerProvider> {/* This should wrap all Routes if the drawer context is used globally */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/map" element={<HomeMap />} />
            <Route path="/lists" element={<ListComponent />} />
            {/* Add other routes as needed */}
          </Routes>
        </DrawerProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
