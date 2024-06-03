import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserType(userDoc.data().userType);
                }
                setUser(user);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setUser(null); 
                setUserType(null);
            }
        });
        return () => unsub();
    }, []);

    const register = async (email, password, additionalData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store additional data in Firestore
            await setDoc(doc(db, 'users', user.uid), additionalData);

            return user;
        } catch (error) {
            throw error;
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

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, userType, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
