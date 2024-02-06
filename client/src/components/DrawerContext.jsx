import React, { createContext, useContext, useState } from 'react';

// Create a Context
const DrawerContext = createContext();

// Custom hook for using context
export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};

// Provider Component
export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Value provided to the context consumers
  const value = {
    isDrawerOpen,
    toggleDrawer,
  };

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
};

