import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      {/* Toolbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      {/* Footer */}
    </div>
  );
}

export default App;
