import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import axios, { InternalAxiosRequestConfig } from "axios";
import { AuthContextProvider } from "./context/Auth.context.tsx";
import { ToastContainer } from "react-toastify";
import { PostContextProvider } from "./context/PostContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
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
