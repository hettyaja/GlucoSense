import React, { createContext, useContext, useState } from 'react';

// Create a context
const PaymentAndAddressContext = createContext();

// Create a provider component
export const PaymentAndAddressProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <PaymentAndAddressContext.Provider value={{ selectedCard, setSelectedCard, selectedAddress, setSelectedAddress }}>
      {children}
    </PaymentAndAddressContext.Provider>
  );
};

// Create a custom hook to use the Payment and Address context
export const usePaymentAndAddress = () => useContext(PaymentAndAddressContext);