import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import Create from "./pages/Create";
import Quiz from "./pages/Quiz";
import Home from "./pages/Home";
import Layout from "./layout/MainLayout";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {isLoggedIn && <Route path="dashboard" element={<Dashboard />} />}
          {isLoggedIn && <Route path="create/:id" element={<Create />} />}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="quiz/:id" element={<Quiz />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
