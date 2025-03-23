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
      <GoogleOAuthProvider clientId="25168563539-uec0fabflus7pb3lu8olf2vqucbngtjb.apps.googleusercontent.com">

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
