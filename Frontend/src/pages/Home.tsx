import { useNavigate } from "react-router";
import { useUser } from "../context/Auth.context";
import { useEffect, useMemo, useState } from "react";
import { usePosts } from "../context/PostContext";
import Post from "../components/Post";
import { Post as PostType } from "../types";

export default function Home() {
  const { user, logout, token } = useUser();
  const { posts } = usePosts();
  const nav = useNavigate();

  const [page, setPage] = useState(1);
  const [itemsInPage, setItemsInPage] = useState(3);
  const paging = useMemo(() => {
    const AllPages = Math.ceil(posts.length / itemsInPage);
    let pages: Array<Array<PostType>> = [];
    let k = 0;

    for (let i = 0; i < AllPages; i++) {
      pages.push([]);
      for (let j = 0; j < itemsInPage && k < posts.length; j++) {
        pages[i].push(posts[k++]);
      }
    }
    return pages;
  }, [posts, itemsInPage]); 

  useEffect(() => {
    if (!token) {
      nav("/auth/login");
    }
  }, [token]);
  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-center space-x-2 items-center p-2">
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Previous
        </button>
        <span>
          {page} of {paging.length}
        </span>
        <button
          onClick={() => {
            if (page < paging.length) {
              setPage(page + 1);
            }
          }}
        >
          Next
        </button>
      </div>
      <div className="overflow-scroll max-h-[800px]">
        {paging[page - 1]?.map((p) => (p ? <Post key={p._id} p={p} /> : null))}
      </div>
      
    </div>
  );
}
