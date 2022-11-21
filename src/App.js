import Budgets from "./pages/budgets/budgets";
import Profile from "./pages/profile/profile";
import Transactions from "./pages/transactions/transactions";
import Nav from "./components/nav/nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserAuth } from "./context/userAuthContext";
import Home from "./pages/home/Home";
import LoginScreen from "./pages/loginScreen/LoginScreen";
import "./app.css";
import CreateBudget from "./pages/budgets/CreateBudget/CreateBudget";
import Budget from "./pages/budgets/Budget/Budget";

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
          path="budgets/create-budget"
          element={user ? <CreateBudget /> : <Navigate to="/" />}
        />
        <Route
          path="budgets/create-budget/:id"
          element={user ? <CreateBudget /> : <Navigate to="/" />}
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
