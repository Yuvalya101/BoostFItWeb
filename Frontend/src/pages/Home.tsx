import { useNavigate } from "react-router";
import { useUser } from "../context/Auth.context";

export default function Home() {
  const { user, logout } = useUser();
  const nav = useNavigate();
  if (!user) {
    return null;
  }
  return (
    <div>
      Hello! <span>{user.name}</span>
      <button
        onClick={() => {
          logout().then(() => nav("/auth/login"));
        }}
      >
        Logout
      </button>
    </div>
  );
}
