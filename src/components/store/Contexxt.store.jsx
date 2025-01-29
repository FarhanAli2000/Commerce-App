import { useState } from "react";
import { useContext as useReactContext, createContext } from "react";
import React from "react";

// Create the context
export const MyContext = createContext();

// The provider component that wraps children
export const MyProvider = ({ children }) => {
    // State initialization for cartApi
    const [cartApi, setCartApi] = useState([]);

    return (
        <MyContext.Provider value={{ setCartApi, cartApi }}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook to use the context
export const useMyContext = () => {
  const context = useReactContext(MyContext);

  // Error handling if context is used outside of the provider
  if (!context) {
    throw new Error("Please provide the wrapper for the context.");
  }

  return context;
};
