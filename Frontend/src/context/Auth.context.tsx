import React, { createContext, use, useEffect, useState } from "react";
<<<<<<< HEAD
import { User } from "../types";
=======
import { Post, User } from "../types";
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
import { UserLogin, UserRegistration } from "../validations";
import * as AuthService from "../services/auth.service";
export interface IAuthContext {
  user: User | null | undefined;
  token: string | null | undefined;
  loading: boolean;
  login: (data: UserLogin) => Promise<void>;
  register: (data: UserRegistration) => Promise<void>;
  logout: () => Promise<void>;
<<<<<<< HEAD
=======
  addPost: (post: Post) => void;
  updatePost: (postId: string, post: Partial<Omit<Post, "_id">>) => void;
  removePost: (postId: string) => void;
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [token, setToken] = useState<string | null | undefined>(localStorage.getItem("token"));
  const [loading, setLoading] = useState<boolean>(false);

<<<<<<< HEAD
=======

  const updatePost = (postId: string, post: Partial<Omit<Post, "_id">>) => {
    setUser((user) => {
      if (!user) {
        return user;
      }
      return {
        ...user,
        posts: user.posts.map((p) => (p._id === postId ? { ...p, ...post } : p)),
      };
    });
  }

  const removePost = (postId: string) => {
    setUser((user) => {
      if (!user) {
        return user;
      }
      return {
        ...user,
        posts: user.posts.filter((p) => p._id !== postId),
      };
    });
  }
  const addPost = (post: Post) => {
    setUser((user) => {
      if (!user) {
        return user;
      }
      return {
        ...user,
        posts: [post, ...user.posts],
      };
    });
  };
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
<<<<<<< HEAD
          setLoading(true)
=======
          setLoading(true);
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
          const user = await AuthService.me();
          setUser(user);
        } catch (e) {
          console.log(e);
<<<<<<< HEAD
        }
        finally {
          setLoading(false)
=======
        } finally {
          setLoading(false);
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
        }
      };
      fetchUser();
    }
  }, [token]);

  async function login(data: UserLogin) {
    try {
      setLoading(true);
      const token = await AuthService.login(data);
      localStorage.setItem("token", token);
      setToken(token);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  }
  async function register(data: UserRegistration) {
    try {
      setLoading(true);
      // ignore this here..
      const user = await AuthService.register(data);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  }
  async function logout() {
    localStorage.removeItem("token");
    setUser(undefined);
    setToken(undefined);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
<<<<<<< HEAD
=======
        addPost,
        updatePost,
        removePost,
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  const userContext = use(AuthContext);
  if (!userContext) {
    throw new Error("Auth context not provided");
  }
  return userContext;
};
