// BPProfileContext.js

import React, { createContext, useContext, useState } from 'react';

const BPProfileContext = createContext();

export const useProfile = () => useContext(BPProfileContext);

export const BPProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
   
    photoUri: 'https://reactnative.dev/img/tiny_logo.png',
    shopName: '',
    username: 'Ayam_ayam',
    location: '',
    description: ''
  });

  return (
    <BPProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </BPProfileContext.Provider>
  );
};