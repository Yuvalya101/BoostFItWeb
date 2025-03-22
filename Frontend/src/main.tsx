import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import axios, { InternalAxiosRequestConfig } from "axios";
import { AuthContextProvider } from "./context/Auth.context.tsx";
import { ToastContainer } from "react-toastify";
import { PostContextProvider } from "./context/PostContext.tsx";

import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <PostContextProvider>
      <GoogleOAuthProvider clientId="260438061879-s58d32i39i0iurdtfcvvai4je48nsjh6.apps.googleusercontent.com
">

        <App />
        </GoogleOAuthProvider>
      </PostContextProvider>
    </AuthContextProvider>
    <ToastContainer />
  </BrowserRouter>
);

axios.defaults.baseURL = "http://localhost:8080/";
function TokenInterceptor(config: InternalAxiosRequestConfig<any>) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function RequestErrorHandler(error: any) {
  return Promise.reject(error);
}

axios.interceptors.request.use(TokenInterceptor, RequestErrorHandler);
