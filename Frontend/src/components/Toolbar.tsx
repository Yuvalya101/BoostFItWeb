import { useNavigate } from "react-router";
import supp from "../assets/supp.png";
import { useUser } from "../context/Auth.context";
import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
const API_KEY = "4c9dc578e5184056bfd131803242807";
const options = ["London", "Paris", "New York", "Tel Aviv"];

export default function Toolbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const nav = useNavigate();
  const { user, logout } = useUser();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [weatherData, setWeatherData] = useState<any>(null);
  const getWeather = async (city: string) => {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.replace(" ", "%20")}`
    );
    const data = await res.json();
    setWeatherData(data);
  };
  useEffect(() => {
    getWeather(options[selectedIndex]);
  }, [selectedIndex]);
  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);
  return (
    <div className="text-[var(--main-color)] w-full mb-2 border-b-[lightgray] border-b-[1px] flex justify-between p-2 font-bold items-center gap-2">
      <div className="flex flex-row items-center gap-2">
        <img width={30} src={supp} />
        <span className="text-black font-normal">suph</span>
        <div className="flex flex-row items-center gap-2 ml-4">
          <span className="text-black font-bold text-[12px]">
            {weatherData && weatherData.location.name}
          </span>
          {weatherData && (
            <div className="flex flex-row items-center gap-2  text-[12px]">
              <span className="text-black font-normal ">{weatherData.current.temp_c}°C</span>
              <span className="text-black font-normal small">
                {weatherData.current.condition.text}
              </span>
            </div>
          )}
          {weatherData && <img width={30} src={"https:" + weatherData.current.condition.icon} />}
          <div>
            <select
              className="text-black font-normal text-[12px]"
              value={selectedIndex}
              onChange={(e) => {
                setSelectedIndex(parseInt(e.target.value));
              }}
            >
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <span className="cursor-pointer" onClick={handleClick}>
        {user?.name}
      </span>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            nav("/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav("/my-posts");
          }}
        >
          My Posts
        </MenuItem>
        <MenuItem
          onClick={async () => {
            handleClose();
            await logout();
            nav("/auth/login");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
