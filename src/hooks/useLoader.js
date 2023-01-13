/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect, createContext, useContext } from 'react';

import Loader from 'components/Loader/Loader';

const LoaderContext = createContext({});

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const loader = () => {
    if (isLoading) return <Loader />;
    return null;
  };

  return <LoaderContext.Provider value={{ loader, isLoading, setIsLoading }}>{children}</LoaderContext.Provider>;
};

function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) throw new Error('use context must be used within SectionProvider');
  return context;
}

export { LoaderProvider, useLoader };
