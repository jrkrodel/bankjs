import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  //Add user data to firestore
  const addUser = async (email) => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: email,
        budgets: [],
        transactions: [],
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

  return (
    <userAuthContext.Provider value={{ user, login, signUp, logout }}>
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
  console.log(auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    let date = new Date();
    let currentDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    let currentTranscations = userSnap.data().transactions;
    let recentDesposit = {
      date: currentDate,
      deposit: deposit,
      type: "deposit",
    };
    let newTranscations = [...currentTranscations, recentDesposit];
    await updateDoc(userRef, {
      transactions: newTranscations,
    });
  } else {
    console.log("No such document!");
  }
}

export async function makePayment(payment) {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    let currentTranscations = userSnap.data().transactions;
    let newTranscations = [...currentTranscations, payment];
    await updateDoc(userRef, {
      transactions: newTranscations,
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
  }

  // let currentTranscations = userSnap.data().transactions;
  // console.log(currentTranscations);
  // console.log(doc(db, "users", auth.currentUser.uid));
  // const userRef = doc(db, "users", auth.currentUser.uid);
  // const userSnap = await getDoc(userRef);
  // if (userSnap.exists()) {
  //   let currentTranscations = userSnap.data().transactions;
  //   console.log(currentTranscations);
  // } else {
  //   console.log("No such document!");
  // }
}
