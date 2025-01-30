import { useCallback, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import "./auth.styles.css";
import { useUser } from "../context/Auth.context";
export default function AuthLayout() {
  const location = useLocation();

  const Links = useCallback(() => {
    if (location.pathname.includes("register")) {
      return (
<<<<<<< HEAD
        <div className="p-2">
=======
        <div className="p-2 mx-auto w-fit">
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
          <span>Already have an account?</span>
          <Link to={"/auth/login"} className="px-[2px]">
            Sign in now
          </Link>
        </div>
      );
    }
    return (
<<<<<<< HEAD
      <div className="p-2">
=======
      <div className="p-2 mx-auto w-fit">
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
        <span>Don't have an account?</span>
        <Link to={"/auth/register"} className="px-[2px]">
          Create one now
        </Link>
      </div>
    );
  }, [location.pathname]);

  const { user, loading } = useUser();
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, [user]);

<<<<<<< HEAD
  if(loading) {
    return null
  }
=======
  
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
  return (
    <div>
      <div>
        <Outlet />
        <Links />
      </div>
    </div>
  );
}
