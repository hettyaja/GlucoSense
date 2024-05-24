// BPProfileContext.js

import React, { createContext, useContext, useState } from 'react';

const BPProfileContext = createContext();

export const useProfile = () => useContext(BPProfileContext);

export const BPProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // https://unsplash.com/photos/wQLAGv4_OYs
    photoUri: '',
    shopName: '',
    username: '',
    location: '',
    description: ''
  });

  return (
    <BPProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </BPProfileContext.Provider>
  );
};