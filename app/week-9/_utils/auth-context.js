"use client";

import { useContext, createContext, useState, useEffect, useRef } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signingRef = useRef(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const gitHubSignIn = async () => {
    if (signingRef.current) return;
    signingRef.current = true;

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err?.code === "auth/popup-blocked" || err?.code === "auth/cancelled-popup-request") {
        const provider = new GithubAuthProvider();
        await signInWithRedirect(auth, provider); 
      } else {
        throw err;
      }
    } finally {
      signingRef.current = false;
    }
  };

  const firebaseSignOut = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
