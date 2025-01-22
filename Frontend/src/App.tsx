import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";
import SideBar from "./components/Sidebar";
import { useUser } from "./context/Auth.context";
import Create from "./pages/Create";
import Toolbar from "./components/Toolbar";
function App() {
  const { token, user } = useUser();

  return (
    <div className="h-full">
      {/* Toolbar */}
      <div className={token ? "main-grid h-full" : "h-full"}>
        {token && <SideBar />}
        <div className="p-2">
          {token && user && <Toolbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
      </div>
      {/* Footer */}
    </div>
  );
}

export default App;
