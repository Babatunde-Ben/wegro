import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import App from "./App";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UnprotectedRoutes from "./components/UnprotectedRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Recommended from "./pages/Recommended";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MusicContextProvider } from "./contexts/MusicContext";
import Search from "./pages/Search";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MusicContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
          <Routes>
            <Route path="/" element={<Navigate to={"/home"} />} />
            <Route element={<UnprotectedRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/recommended" element={<Recommended />} />
              <Route path="/search" element={<Search />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </QueryClientProvider>
      </MusicContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
