import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [userType, setUserType] = useState(null);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserType('user');
                    setUsername(userDoc.data().username)
                    setName(userDoc.data().name)
                } else {
                    const businessDoc = await getDoc(doc(db, 'businessPartner', user.uid))
                    if (businessDoc.exists()) {
                        setUserType('businessPartner')
                        setUsername(userDoc.data().username)
                    } else {
                        const adminDoc = await getDoc(doc(db, 'systemAdmin', user.uid))
                        if (adminDoc.exists()) {
                            setUserType('systemAdmin')
                            setUsername(userDoc.data().username)
                        }
                    }
                }
                setUser(user);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setUser(null); 
                setUserType(null);
                setUsername(null);
            }
        });
        return () => unsub();
    }, []);

    const register = async (email, password, additionalData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const { userType, username, name, UEN, NRIC, entityName } = additionalData;

            if (userType === 'free') {
                await setDoc(doc(db, 'users', user.uid), {
                    username,
                    name,
                    email: user.email,
                    subscriptionType: 'free'
                })
            } else if (userType === 'businessPartner') {
                await setDoc(doc(db, 'businessPartner', user.uid), {
                    entityName,
                    email: user.email,
                    UEN,
                    NRIC
                })
            }
            return user;
        } catch (error) {
            throw error;
        }
    };

    const setBodyProfile = async (uid, gender, birthdate, weight) => {
        try {
            // Construct the document reference for the user
            const userDocRef = doc(db, 'users', uid);
                
            // Set the fields gender, birthdate, and weight in the user document
            await setDoc(userDocRef, {
                gender,
                birthdate,
                weight
            }, { merge: true }); // Using merge: true ensures existing fields are not overwritten
    
                // Return the updated user document or whatever you need
            return { uid, gender, birthdate, weight };
             
        } catch (error) {
            throw error; // Rethrow the error to handle it elsewhere in your application
        }
    };

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    const resetAuth = async () => {
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, userType, name, username, login, register, logout, resetAuth, setBodyProfile}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
