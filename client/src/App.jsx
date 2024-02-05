import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import GoogleMap from './components/googleMap'; 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> 
        {/* Define other routes as needed */}
        <Route path="/map" element={<GoogleMap />} /> 
      </Routes>
    </Router>
  );
}

export default App;