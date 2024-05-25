// BPProfileContext.js

import React, { createContext, useContext, useState } from 'react';

const BPProfileContext = createContext();

export const useBPProfile = () => useContext(BPProfileContext);

export const BPProfileProvider = ({ children }) => {
  const [BPProfileData, setBPProfileData] = useState({
   
    photoUri: 'https://reactnative.dev/img/tiny_logo.png',
    shopName: '',
    username: 'Ayam_ayam',
    location: '',
    description: ''
  });

  return (
    <BPProfileContext.Provider value={{BPProfileData, setBPProfileData }}>
      {children}
    </BPProfileContext.Provider>
  );
};