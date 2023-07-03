"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user ? user : null);
    setIsLoading(false); // Set loading state to false once the user is fetched
  });

  return () => {
    unsubscribe();
  };
}, []);

  useEffect(() => {
    console.log("The user is", currentUser);
  }, [currentUser]);

  function logout() {
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const value = {
    currentUser,
    isLoading,
    signInWithGoogle,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}