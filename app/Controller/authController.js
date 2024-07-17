import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { deleteUser as firebaseDeleteUser } from 'firebase/auth';
import { auth, db } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [userType, setUserType] = useState(null);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);
    const [gender, setGender] = useState(null);
    const [birthdate, setBirthdate] = useState(null);
    const [status, setStatus] = useState(null)

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
                        setIsAuthenticated(false);
                        setUser(null);
                        setUserType(null);
                        setUsername(null);
                        setName(null);
                        setEmail(null);
                        setGender(null);
                        setBirthdate(null);
                        setWeight(null);
                        setHeight(null);
                        setStatus(null);
                    } else {
                        if (userDoc.exists()) {
                            setUserType('user');
                            setUsername(userDoc.data().username);
                            setName(userDoc.data().name);
                            setEmail(userDoc.data().email);
                            setGender(userDoc.data().gender);
                            setBirthdate(userDoc.data().birthdate);
                            setWeight(userDoc.data().weight);
                            setHeight(userDoc.data().height);
                            setStatus(userDoc.data().status);
                        } else if (businessDoc.exists()) {
                            setUserType('businessPartner');
                            setUsername(businessDoc.data().username);
                            setStatus(businessDoc.data().status);
                        } else if (adminDoc.exists()) {
                            setUserType('systemAdmin');
                            setUsername(adminDoc.data().username);
                        }
    
                        setUser(user);
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                    setIsAuthenticated(false);
                    setUser(null);
                    setUserType(null);
                    setUsername(null);
                    setName(null);
                    setEmail(null);
                    setGender(null);
                    setBirthdate(null);
                    setWeight(null);
                    setHeight(null);
                    setStatus(null);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
                setUserType(null);
                setUsername(null);
                setName(null);
                setEmail(null);
                setGender(null);
                setBirthdate(null);
                setWeight(null);
                setHeight(null);
                setStatus(null);
            }
        });
    
        return () => unsub();
    }, []);

    const setBodyProfile = async (uid, gender, birthdate, weight, height) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            await setDoc(userDocRef, {
                gender,
                birthdate,
                weight,
                height
            }, { merge: true });
            setGender(gender);
            setBirthdate(birthdate);
            setWeight(weight);
            setHeight(height);
            return { uid, gender, birthdate, weight, height };
        } catch (error) {
            throw error;
        }
    };

    const setAccountProfile = async (uid, name, email, username) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            await setDoc(userDocRef, {
                name,
                email,
                username
            }, { merge: true });
            setName(name);
            setEmail(email);
            setUsername(username);
            return { uid, name, email, username };
        } catch (error) {
            throw error;
        }
    };

    const deleteUser = async (uid, roles) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            await deleteDoc(userDocRef);
            await AsyncStorage.clear();
            const currentUser = auth.currentUser;
            if (currentUser) {
                await firebaseDeleteUser(currentUser);
            } else {
                throw new Error('No user is currently signed in');
            }
            return true;
        } catch (error) {
            console.error('Error deleting user profile:', error);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                throw new Error('The password is wrong. Please try again.');
            } else if (error.code === 'auth/invalid-email') {
                throw new Error('Please input a valid email.');
            } else {
                throw new Error(error.message);
            }
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.clear();
        } catch (error) {
            throw error;
        }
    };

    const resetAuth = async () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, userType, name, username, email, gender, birthdate, weight, height, status, deleteUser, login, register, logout, resetAuth, setBodyProfile, setAccountProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);