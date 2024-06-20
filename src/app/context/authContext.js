import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [userType, setUserType] = useState(null);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [weight, setWeight] = useState(null);
    const [gender, setGender] = useState(null);
    const [birthdate, setBirthdate] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserType('user');
                    setUsername(userDoc.data().username);
                    setName(userDoc.data().name);
                    setEmail(userDoc.data().email);
                    setGender(userDoc.data().gender);
                    setBirthdate(userDoc.data().birthdate);
                    setWeight(userDoc.data().weight);
                } else {
                    const businessDoc = await getDoc(doc(db, 'businessPartner', user.uid));
                    if (businessDoc.exists()) {
                        setUserType('businessPartner');
                        setUsername(businessDoc.data().username);
                    } else {
                        const adminDoc = await getDoc(doc(db, 'systemAdmin', user.uid));
                        if (adminDoc.exists()) {
                            setUserType('systemAdmin');
                            setUsername(adminDoc.data().username);
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
                setName(null);
                setEmail(null);
                setGender(null);
                setBirthdate(null);
                setWeight(null);
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
                });
            } else if (userType === 'businessPartner') {
                await setDoc(doc(db, 'businessPartner', user.uid), {
                    entityName,
                    email: user.email,
                    UEN,
                    NRIC
                });
            }
            return user;
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('This email is already in use. Please use a different email.');
            } else if (error.code === 'auth/weak-password') {
                throw new Error('Password should be at least 6 characters.');
            } else if (error.code === 'auth/missing-password') {
                throw new Error('The password field cannot be empty.');
            } else if (error.code === 'auth/invalid-email') {
                throw new Error('Please input valid email.');
            } else {
                throw new Error(error.message);
            }
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

            // Update local state
            setGender(gender);
            setBirthdate(birthdate);
            setWeight(weight);

            // Return the updated user document or whatever you need
            return { uid, gender, birthdate, weight };

        } catch (error) {
            throw error; // Rethrow the error to handle it elsewhere in your application
        }
    };

    const setAccountProfile = async (uid, name, email, username) => {
        try {
            // Construct the document reference for the user
            const userDocRef = doc(db, 'users', uid);

            // Set the fields gender, birthdate, and weight in the user document
            await setDoc(userDocRef, {
                name,
                email,
                username
            }, { merge: true }); // Using merge: true ensures existing fields are not overwritten

            // Update local state
            setName(name);
            setEmail(email);
            setUsername(username);

            // Return the updated user document or whatever you need
            return { uid, name, email, username };

        } catch (error) {
            throw error; // Rethrow the error to handle it elsewhere in your application
        }
    };
    const deleteUser = async (uid) => {
        try {
            // Construct the document reference for the user
            const userDocRef = doc(db, 'users', uid);

            // Delete the user document
            await deleteDoc(userDocRef);

            // Additional cleanup if necessary (e.g., related documents or storage)

            return true;
        } catch (error) {
            throw error; // Rethrow the error to handle it elsewhere in your application
        }
    };
    
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                throw new Error('The password is wrong. Please try again.');
            } else if (error.code === 'auth/invalid-email') {
                throw new Error('Please input valid email.');
            } else {
                throw new Error(error.message);
            }
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
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, userType, name, username, email, gender, birthdate, weight, deleteUser, login, register, logout, resetAuth, setBodyProfile, setAccountProfile}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
