import { FormEvent, useMemo, useRef, useState } from "react";
import { useUser } from "../context/Auth.context";
import { uploadImage } from "../services/auth.service";
import { toast } from "react-toastify";
import { usePosts } from "../context/PostContext";
import { useNavigate, useParams } from "react-router";

export default function Create() {
  const { sharePost, posts, updatePost } = usePosts();

  const { editId } = useParams();
  const editingPost = useMemo(() => posts.find((p) => p._id === editId), [editId, posts]);
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [image, setImage] = useState<File>();
  const nav = useNavigate();
  const [content, setContent] = useState<string>(editingPost?.content || "");

  const date = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("he-il") + " " + d.getHours() + ":" + d.getMinutes();
  }, []);

  async function onSubmitPost() {
    if (editingPost) {
      try {
        if (!image && !content && !editingPost.image)
          throw new Error("Please fill the content field and pick an image");
        const imageUrl = image ? await uploadImage(image) : editingPost.image;
        const post = {
          image: imageUrl,
          content,
        };
        await updatePost(editingPost._id, post);
        toast("Post changes saved successfully");
        nav("/");
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      try {
        if (!image || !content) throw new Error("Please fill the content field and pick an image");
        const imageUrl = await uploadImage(image);
        const post = {
          image: imageUrl,
          content,
          createdAt: new Date().toISOString(),
          likes: [],
          comments: [],
          user: user!._id,
        };
        await sharePost(post);
        toast("Post shared successfully");
        nav("/");
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  }
  return (
    <div className="w-full flex flex-col max-h-[800px] overflow-scroll pb-4">
      <form onSubmit={onSubmitPost} className="flex flex-col max-w-[500px] p-2">
        <label>Pick an image</label>
        <input type="file" onChange={(e) => e.target.files && setImage(e.target.files[0])} />
        <label>Post content</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          name="content"
          defaultValue={editingPost?.content}
          placeholder="post content"
          className="p-2 border-[1px] border-[lightgray] min-h-[100px]"
        />
      </form>

      {((image && content) || editingPost) && (
        <div className="p-2 flex flex-col w-fit">
          <label className="font-bold pb-2 underline">Preview</label>
          <label className="font-bold"> {user?.name}</label>
          <img
            src={image && content ? URL.createObjectURL(image) : editingPost?.image}
            width={300}
          />
          <span className="py-2 font-extralight max-w-[320px]">{content}</span>
          <span className="text-[gray] text-[12px] self-end">{date}</span>
          <span>0 Likes</span>
        </div>
      )}
      <button onClick={onSubmitPost} className="ml-auto self-end border-black">
        {editingPost ? "Save changes" : "Share"}
      </button>
    </div>
  );
}
