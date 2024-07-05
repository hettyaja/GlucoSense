import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    const businessDoc = await getDoc(doc(db, 'businessPartner', user.uid));
                    const adminDoc = await getDoc(doc(db, 'systemAdmin', user.uid));
    
                    if (userDoc.exists() && userDoc.data().status === 'suspended') {
                        alert("Your account is suspended.");
                        await auth.signOut();
                        setUser(false);
                    } else {
                        if (userDoc.exists()) {
                            setUserType('user');
                            setUser({ uid: user.uid, email: user.email, ...userDoc.data() });
                        } else if (businessDoc.exists()) {
                            setUserType('businessPartner');
                            setUser({ uid: user.uid, email: user.email, ...businessDoc.data() });
                        } else if (adminDoc.exists()) {
                            setUserType('systemAdmin');
                            setUser({ uid: user.uid, email: user.email, ...adminDoc.data() });
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                    setUser(false);
                    setUserType(null);
                }
            } else {
                setUser(false);
                setUserType(null);
            }
        });
    
        return () => unsub();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userType}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);