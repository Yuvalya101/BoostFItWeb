import { useNavigate } from "react-router";
import { useUser } from "../context/Auth.context";
<<<<<<< HEAD

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
=======
import { useEffect } from "react";
import { usePosts } from "../context/PostContext";
import Post from "../components/Post";

export default function Home() {
  const { user, logout, token } = useUser();
  const { posts } = usePosts();
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      nav("/auth/login");
    }
  }, [token]);
  if (!user) {
    return null;
  }

  return (
    <div className="overflow-scroll max-h-[800px]">
      {posts.map((p) => (
        <Post key={p._id} p={p} />
      ))}
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
    </div>
  );
}
