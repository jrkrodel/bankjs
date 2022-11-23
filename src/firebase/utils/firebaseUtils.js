import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

export async function getUserData() {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  return userSnap.data();
}

export async function makeDeposit(deposit) {
  console.log("make deposit ran");
  const userRef = doc(db, "users", auth.currentUser.uid);
  const transactionRef = collection(
    db,
    "users",
    auth.currentUser.uid,
    "transactions"
  );
  const userSnap = await getDoc(userRef);
  const d = Number(deposit);
  let date = new Date();
  let currentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  let time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  let currentFunds = userSnap.data().funds;
  let updatedFunds = currentFunds + d;
  let updatedTransactions = userSnap.data().transactions + 1;
  let updatedEarnings = userSnap.data().earnings + d;
  await addDoc(transactionRef, {
    date: currentDate,
    amount: deposit,
    type: "deposit",
    updatedAt: time,
  });
  await updateDoc(userRef, {
    funds: updatedFunds,
    transactions: updatedTransactions,
    earnings: updatedEarnings,
  });
  console.log("Make Deposit Ran");
}

export async function makePayment(payment) {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  const p = Number(payment.amount);
  let date = new Date();
  let time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const transactionRef = collection(
    db,
    "users",
    auth.currentUser.uid,
    "transactions"
  );

  let currentFunds = userSnap.data().funds;
  let newFunds = currentFunds - p;
  let updatedTransactions = userSnap.data().transactions + 1;
  let updatedSpending = userSnap.data().spendings + p;
  await addDoc(transactionRef, {
    amount: payment.amount,
    category: payment.category,
    date: payment.date,
    for: payment.for,
    type: payment.type,
    updatedAt: time,
    createdAt: Date.parse(payment.date),
  });
  await updateDoc(userRef, {
    funds: newFunds,
    transactions: updatedTransactions,
    spendings: updatedSpending,
  });
  console.log("Make Payment Ran");
}

export async function getTransactions() {
  console.log("Get Transactions Ran");
  const transactions = [];
  const querySnapshot = await getDocs(
    collection(db, "users", auth.currentUser.uid, "transactions")
  );
  querySnapshot.forEach((doc) => {
    transactions.push(doc.data());
  });

  const sortedTransactions = transactions.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });

  if (transactions) {
    return sortedTransactions;
  } else {
    console.log("No such document!");
  }
}

export async function getTransactionsForGraph(length) {
  const transactions = {
    education: 0,
    entertainment: 0,
    food: 0,
    health: 0,
    housing: 0,
    personal: 0,
    transportation: 0,
    utilities: 0,
  };

  const querySnapshot = await getDocs(
    collection(db, "users", auth.currentUser.uid, "transactions")
  );
  querySnapshot.forEach((doc) => {
    if (doc.data().createdAt >= length) {
      transactions[doc.data().category] += Number(doc.data().amount);
    }
  });

  if (transactions) {
    return transactions;
  } else {
    console.log("No such document!");
  }
  console.log("Get Transactions For Graph Ran");
}

export async function createBudget(budget) {
  const budgets = [];
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  const querySnapshot = await getDocs(
    collection(db, "users", auth.currentUser.uid, "budgets")
  );
  querySnapshot.forEach((doc) => {
    budgets.push(doc.data());
  });

  const updatedBudgets = userSnap.data().budgets + 1;
  const budgetRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "budgets",
    `budget_${budgets.length}`
  );

  await setDoc(budgetRef, {
    budget,
  });
  await updateDoc(userRef, {
    budgets: updatedBudgets,
  });
}

export async function getBudgets() {
  const budgets = [];
  const querySnapshot = await getDocs(
    collection(db, "users", auth.currentUser.uid, "budgets")
  );
  querySnapshot.forEach((doc) => {
    budgets.push(doc.data().budget);
  });

  if (budgets) {
    return budgets.reverse();
  } else {
    console.log("No such document!");
  }
  console.log("Get Budget Ran");
}

export async function getBudgetData(id) {
  const budgetRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "budgets",
    `budget_${id}`
  );
  const budgetSnap = await getDoc(budgetRef);
  const budget = budgetSnap.data();
  if (budgetSnap.exists()) {
    return budget.budget;
  }
  console.log("Get Budget Data Ran");
}

export async function deleteBudget(id) {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  const updatedBudgets = userSnap.data().budgets - 1;
  const budgetRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "budgets",
    `budget_${id}`
  );

  await deleteDoc(budgetRef);
  await updateDoc(userRef, {
    budgets: updatedBudgets,
  });
}

export async function editBudget(budget, id) {
  const budgetRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "budgets",
    `budget_${id}`
  );

  await updateDoc(budgetRef, {
    budget,
  });
}
