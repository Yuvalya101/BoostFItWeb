import { useNavigate } from "react-router";
import supp from "../assets/supp.png";
import { useUser } from "../context/Auth.context";

export default function Toolbar() {
  const nav = useNavigate();
  const { user } = useUser();
  return (
    <div className="text-[var(--main-color)] w-full mb-2 border-b-[lightgray] border-b-[1px] flex justify-between p-2 font-bold items-center gap-2">
      <div className="flex flex-row items-center gap-2">
        <img width={30} src={supp} />
        <span className="text-black font-normal">suph</span>
      </div>
      <span className="cursor-pointer" onClick={() => nav("/profile")}>
        {user?.name}
      </span>
    </div>
  );
}
