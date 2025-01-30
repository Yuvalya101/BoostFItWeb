import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import axios, { InternalAxiosRequestConfig } from "axios";
import { AuthContextProvider } from "./context/Auth.context.tsx";
import { ToastContainer } from "react-toastify";
<<<<<<< HEAD
=======
import { PostContextProvider } from "./context/PostContext.tsx";
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
<<<<<<< HEAD
      <App />
=======
      <PostContextProvider>
        <App />
      </PostContextProvider>
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
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
