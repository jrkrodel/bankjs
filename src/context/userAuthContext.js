import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/config/firebaseConfig";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userFunds, setUserFunds] = useState(0);
  const [authRunning, setAuthRunning] = useState(true);

  //Add user data to firestore
  const addUser = async (email) => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: email,
        budgets: 0,
        transactions: 0,
        funds: 0,
        spendings: 0,
        earnings: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Authenticate user
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  //Signup and authenticate new user
  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password).then(() => {
      //After user is created, add user data to firestore
      addUser(email);
    });
  }

  //Log user out
  function logout() {
    return signOut(auth);
  }

  //When auth changes, or when user logs in, set user to currentUser
  //Include cleanup function
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      console.log("Set User Ran");
      setAuthRunning(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (user) {
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setUserFunds(doc.data().funds.toFixed(2));
      console.log("Snapshot Ran");
    });
  }

  return (
    <userAuthContext.Provider
      value={{ user, login, signUp, logout, userFunds, authRunning }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
