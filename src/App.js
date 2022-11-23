import Budgets from "./pages/Budgets/Budgets";
import Profile from "./pages/Profile/Profile";
import Transactions from "./pages/Transactions/Transactions";
import Nav from "./components/Nav/Nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserAuth } from "./context/userAuthContext";
import Home from "./pages/Home/Home";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import "./app.css";
import BudgetForm from "./components/BudgetForm/BudgetForm";
import Budget from "./pages/Budgets/Budget/Budget";

function App() {
  const { user } = useUserAuth();
  const { userFunds } = useUserAuth();

  return (
    <BrowserRouter>
      {user && <Nav funds={userFunds} />}
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route
          exact
          path="home"
          element={!user ? <Navigate to="/" /> : <Home />}
        />
        <Route
          path="transactions"
          element={user ? <Transactions /> : <Navigate to="/" />}
        />
        <Route
          path="budgets"
          element={user ? <Budgets /> : <Navigate to="/" />}
        />
        <Route
          path="budgets/:id"
          element={user ? <Budget /> : <Navigate to="/" />}
        />
        <Route
          path="budgets/budget-form"
          element={user ? <BudgetForm /> : <Navigate to="/" />}
        />
        <Route
          path="budgets/budget-form/:id"
          element={user ? <BudgetForm /> : <Navigate to="/" />}
        />
        <Route
          path="profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
