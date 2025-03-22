import { useCallback, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import "./auth.styles.css";
import { useUser } from "../context/Auth.context";
export default function AuthLayout() {
  const location = useLocation();

  const Links = useCallback(() => {
    if (location.pathname.includes("register")) {
      return (
        <div className="p-2 mx-auto w-fit">
          <span>Already have an account?</span>
          <Link to={"/auth/login"} className="px-[2px]">
            Sign in now
          </Link>
        </div>
      );
    }
    return (
      <div className="p-2 mx-auto w-fit">
        <span>Don't have an account?</span>
        <Link to={"/auth/register"} className="px-[2px]">
          Create one now
        </Link>
      </div>
    );
  }, [location.pathname]);

  const { user } = useUser();
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, [user]);

  
  return (
    <div>
      <div>
        <Outlet />
        <Links />
      </div>
    </div>
  );
}
