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
  const signingRef = useRef(false); // prevent re-entrancy

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
      setLoading(false);
    });
    return unsubscribe;
  }, []); // <-- only subscribe once

  const gitHubSignIn = async () => {
    if (signingRef.current) return; // ignore a 2nd click while popup is open
    signingRef.current = true;

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err?.code === "auth/popup-blocked" || err?.code === "auth/cancelled-popup-request") {
        const provider = new GithubAuthProvider();
        await signInWithRedirect(auth, provider); // reliable on Safari/iOS
      } else {
        throw err; // surface real errors
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
