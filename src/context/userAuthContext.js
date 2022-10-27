import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userFunds, setUserFunds] = useState(0);

  //Add user data to firestore
  const addUser = async (email) => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: email,
        budgets: [],
        transactions: [],
        funds: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Authenticate user
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //Signup and authenticate new user
  async function signUp(email, password) {
    try {
      //Create user auth
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        //After user is created, add user data to firestore
        addUser(email);
      });
    } catch (e) {
      console.log(e);
    }
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
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (user) {
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setUserFunds(doc.data().funds.toFixed(2));
    });
  }

  return (
    <userAuthContext.Provider
      value={{ user, login, signUp, logout, userFunds }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

//Update doc
export async function makeDeposit(deposit) {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  const d = Number(deposit);
  if (userSnap.exists()) {
    let date = new Date();
    let currentDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    let currentTranscations = userSnap.data().transactions;
    let currentFunds = userSnap.data().funds;
    let updatedFunds = currentFunds + d;
    let recentDesposit = {
      date: currentDate,
      amount: deposit,
      type: "deposit",
    };
    let newTranscations = [recentDesposit, ...currentTranscations];
    await updateDoc(userRef, {
      transactions: newTranscations,
      funds: updatedFunds,
    });
  } else {
    console.log("No such document!");
  }
}

export async function makePayment(payment) {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  const p = Number(payment.amount);

  if (userSnap.exists()) {
    let currentTranscations = userSnap.data().transactions;
    let currentFunds = userSnap.data().funds;
    let newFunds = currentFunds - p;
    let newTranscations = [payment, ...currentTranscations];

    await updateDoc(userRef, {
      transactions: newTranscations,
      funds: newFunds,
    });
  } else {
    console.log("No such document!");
  }
}

export async function getTransactions() {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();
  if (userSnap.exists()) {
    return user.transactions;
  } else {
    console.log("No such document!");
  }
}
