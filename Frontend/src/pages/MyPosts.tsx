import Post from "../components/Post";
import { useUser } from "../context/Auth.context";

export default function MyPosts() {
  const { user } = useUser();
  const posts = user?.posts || [];
  return (
    <div>
      <h2 className="font-bold text-[24px] ml-4">My posts</h2>
      <div
        className="overflow-scroll max-h-[800px]"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {posts.map((p) => (
          <Post key={p._id} p={p} owned/>
        ))}
      </div>
    </div>
  );
}
