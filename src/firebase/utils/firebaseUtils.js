import {
  doc,
  setDoc,
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
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear();
  let time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  let currentFunds = userSnap.data().funds;
  let updatedFunds = currentFunds + d;
  let updatedTransactions = userSnap.data().transactions + 1;
  let updatedEarnings = userSnap.data().earnings + d;

  const docRef = doc(transactionRef);

  const documentID = docRef.id;

  await setDoc(docRef, {
    date: currentDate,
    amount: deposit,
    type: "deposit",
    updatedAt: time,
    id: documentID,
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
  let displayDate = new Date(payment.date);
  let convertedDate =
    (displayDate.getMonth() > 8
      ? displayDate.getMonth() + 1
      : "0" + (displayDate.getMonth() + 1)) +
    "/" +
    (displayDate.getDate() > 9
      ? displayDate.getDate()
      : "0" + displayDate.getDate()) +
    "/" +
    displayDate.getFullYear();
  let date = new Date();
  let time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const transactionRef = collection(
    db,
    "users",
    auth.currentUser.uid,
    "transactions"
  );

  const docRef = doc(transactionRef);

  const documentID = docRef.id;

  let currentFunds = userSnap.data().funds;
  let newFunds = currentFunds - p;
  let updatedTransactions = userSnap.data().transactions + 1;
  let updatedSpending = userSnap.data().spendings + p;

  await setDoc(docRef, {
    amount: payment.amount,
    category: payment.category,
    date: convertedDate,
    for: payment.for,
    type: payment.type,
    id: documentID,
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

export async function deleteTransaction(id, amount, type) {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  const updatedTransactions = userSnap.data().transactions - 1;
  let updatedFunds;
  let updatedEarnings;
  let updatedSpendings;

  if (type === "payment") {
    updatedFunds = userSnap.data().funds + Number(amount);
    updatedSpendings = userSnap.data().spendings - Number(amount);
  } else if (type === "deposit") {
    updatedFunds = userSnap.data().funds - Number(amount);
    updatedEarnings = userSnap.data().earnings - Number(amount);
  }

  const transactionRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "transactions",
    `${id}`
  );

  await deleteDoc(transactionRef);

  if (type === "payment") {
    await updateDoc(userRef, {
      transactions: updatedTransactions,
      funds: updatedFunds,
      spendings: updatedSpendings,
    });
  } else {
    await updateDoc(userRef, {
      transactions: updatedTransactions,
      funds: updatedFunds,
      earnings: updatedEarnings,
    });
  }
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

export async function deleteAccountData() {
  const userRef = doc(db, "users", auth.currentUser.uid);
  await deleteDoc(userRef);
}

export async function updateProfileDoc(fName, lName, email) {
  console.log(fName);
  const userRef = doc(db, "users", auth.currentUser.uid);

  await updateDoc(userRef, {
    name: fName.trim() + " " + lName.trim(),
    email: email,
  });
}
