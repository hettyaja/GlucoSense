import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
   
    photoUri: 'https://reactnative.dev/img/tiny_logo.png',
    username: 'Bebek_bebek',
    name: 'Agustianto Jusuf Kalla',
    email: 'dummy@gmail.com',
    birthdate: new Date('2024-05-20'),
    gender: 'Male'
  });

  return (
    <ProfileContext.Provider value={{profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};