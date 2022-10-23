import Budgets from "./pages/budgets/budgets";
import Profile from "./pages/profile/profile";
import Transactions from "./pages/transactions/transactions";
import Nav from "./components/nav/nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserAuth } from "./context/userAuthContext";
import Home from "./pages/home/Home";
import LoginScreen from "./pages/loginScreen/LoginScreen";

function App() {
  const { user } = useUserAuth();
  return (
    <BrowserRouter>
      {user && <Nav />}
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
          path="profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
