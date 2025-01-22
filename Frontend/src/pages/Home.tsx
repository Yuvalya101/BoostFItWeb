import { useNavigate } from "react-router";
import { useUser } from "../context/Auth.context";
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
    </div>
  );
}
