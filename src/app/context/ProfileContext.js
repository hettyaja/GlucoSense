import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
   
    photoUri: 'https://reactnative.dev/img/tiny_logo.png',
    username: 'Babi_babi',
    name: 'Agustianto Jusuf Kalla',
    email: ''
  });

  return (
    <ProfileContext.Provider value={{profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};