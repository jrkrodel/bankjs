import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "../firebase/config/firebaseConfig";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userFunds, setUserFunds] = useState(0);
  const [authRunning, setAuthRunning] = useState(true);

  //Add user data to firestore
  const addUser = async (email, fName, lName) => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: fName + " " + lName,
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
  async function signUp(email, password, signUpForm) {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        updateProfile(auth.currentUser, {
          displayName: signUpForm.fName.trim() + " " + signUpForm.lName.trim(),
        });
        //After user is created, add user data to firestore
        addUser(email, signUpForm.fName, signUpForm.lName);
      }
    );
  }

  async function updateUserDetails(email, fName, lName) {
    await updateProfile(auth.currentUser, {
      email: email,
      displayName: fName.trim() + " " + lName.trim(),
    });
    await updateEmail(auth.currentUser, email)
      .then(() => {
        console.log("updated");
      })
      .catch((error) => {
        console.log(error);
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

  function deleteAccount() {
    if (user) {
      deleteUser(auth.currentUser)
        .then(() => {
          console.log("deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <userAuthContext.Provider
      value={{
        user,
        login,
        signUp,
        logout,
        userFunds,
        authRunning,
        deleteAccount,
        updateUserDetails,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
