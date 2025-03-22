import React, { createContext, use, useEffect, useState } from "react";
import { Post, User } from "../types";
import { UserLogin, UserRegistration } from "../validations";
import * as AuthService from "../services/auth.service";
export interface IAuthContext {
  user: User | null | undefined;
  token: string | null | undefined;
  loading: boolean;
  login: (data: UserLogin) => Promise<void>;
  loginWithGoogle: (googleToken: any) => Promise<void>;
  register: (data: UserRegistration) => Promise<void>;
  logout: () => Promise<void>;
  addPost: (post: Post) => void;
  updatePost: (postId: string, post: Partial<Omit<Post, "_id">>) => void;
  removePost: (postId: string) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [token, setToken] = useState<string | null | undefined>(localStorage.getItem("token"));
  const [loading, setLoading] = useState<boolean>(false);


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
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const user = await AuthService.me();
          setUser(user);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
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
  async function loginWithGoogle(googleToken: any) {
    try {
      setLoading(true);
      const token = await AuthService.signInWithGoogle(googleToken);
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
      console.log(user);
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
        loginWithGoogle,
        register,
        logout,
        loading,
        addPost,
        updatePost,
        removePost,
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
