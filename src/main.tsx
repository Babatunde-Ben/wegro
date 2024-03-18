import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import App from "./App";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<Navigate to={"login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
