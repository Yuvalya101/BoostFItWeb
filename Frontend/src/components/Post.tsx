import { useMemo, useRef, useState } from "react";
import { Comment as CommentType, Post as PostType, User } from "../types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useUser } from "../context/Auth.context";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { usePosts } from "../context/PostContext";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
const Comment = ({ c }: { c: CommentType }) => {
  return (
    <div className="flex flex-row gap-2">
      <label className="font-bold"> {c.user.name}</label>
      <span>{c.content}</span>
    </div>
  );
};
const PostCommentsDialog = function ({
  post,
  showing,
  close,
}: {
  post: PostType;
  showing: boolean;
  close: () => void;
}) {
  const { commentPost } = usePosts();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sendPost = async () => {
    const content = inputRef.current?.value;
    if (!content) return;
    try {
      await commentPost(post, content);
    } catch (e) {
      console.log(e);
    } finally {
      inputRef.current!.value = "";
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };
  if (!showing) return null;
  return (
    <div
      className="grid place-items-center w-full h-full z-[10000]"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex flex-col w-[400px] h-[500px] bg-white rounded-lg p-2 relative">
        <div onClick={close} className="cursor-pointer top-0 right-0 self-end">
          <CloseIcon />
        </div>
        <div className="flex flex-col gap-2 max-h-[400px] overflow-scroll" ref={scrollRef}>
          {post.comments.map((c) => (
            <Comment c={c} key={c._id} />
          ))}
          {post.comments.length === 0 && <span>No comments</span>}
        </div>
        <div
          className="bottom-4 absolute w-full flex items-center gap-2"
          style={{ display: "grid", gridTemplateColumns: "85% 15%" }}
        >
          <input
            className="border-[1px] border-[lightgray] p-2"
            placeholder="Enter comment"
            ref={inputRef}
          />
          <div className="cursor-pointer" onClick={sendPost}>
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default function Post({ p }: { p: PostType }) {
  const { user } = useUser();
  const [showing, setShowing] = useState(false);
  const { likePost, unlikePost } = usePosts();
  const date = useMemo(() => {
    const d = new Date(p.createdAt);
    return d.toLocaleDateString("he-il") + " " + d.getHours() + ":" + d.getMinutes();
  }, [p]);
  const isLiked = useMemo(() => p.likes.includes(user?._id as string), [p, user]);
  return (
    <div>
      <PostCommentsDialog post={p} showing={showing} close={() => setShowing(false)} />
      <div className="p-2 flex flex-col w-fit z-[999]">
        <label className="font-bold"> {(p.user as User).name}</label>
        <img src={p.image} width={300} />
        <span className="py-2 font-extralight max-w-[320px]">{p.content}</span>
        <span className="text-[gray] text-[12px] self-end">{date}</span>
        <div className="flex flex-row items-center justify-between pt-2">
          <span>{p.likes.length} Likes</span>
          <div className="flex flex-row items-center gap-2">
            {isLiked && <span className="text-[gray] text-[12px]">You liked this post</span>}
            <div className="translate-y-[2px] cursor-pointer" onClick={() => setShowing(true)}>
              <ChatBubbleOutlineIcon />
            </div>

            <div onClick={() => (isLiked ? unlikePost(p._id) : likePost(p._id))}>
              {isLiked ? (
                <ThumbUpIcon className="cursor-pointer" />
              ) : (
                <ThumbUpOffAltIcon className="cursor-pointer" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
