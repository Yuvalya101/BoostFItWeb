import { Link, useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Person2Icon from "@mui/icons-material/Person2";
export default function SideBar() {
  const nav = useNavigate();
  return (
    <div className=" border-r-[rgba(0,0,0,0.2)] border-r-[1px] h-full">
      <ul className="list-none flex flex-col gap-2 p-2">
        <div className="flex flex-row gap-2 items-center" onClick={() => nav("/")}>
          <HomeIcon />
          <span className="link-main">Home</span>
        </div>
        <div className="flex flex-row gap-2 items-center" onClick={() => nav("/profile")}>
          <Person2Icon />
          <span className="link-main">Profile</span>
        </div>

        <div className="flex flex-row gap-2 items-center" onClick={() => nav("/create")}>
          <AddCircleOutlineIcon />
          <span className="link-main">Create</span>
        </div>
      </ul>
    </div>
  );
}
