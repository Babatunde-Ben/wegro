import React from "react";
import { Outlet } from "react-router-dom";
import AuthImage from "../assets/images/image-1.jpeg";
const UnprotectedRoutes = () => {
  return (
    <main className="relative h-screen">
      <section className="hidden bg-slate-700 fixed left-0 top-0 w-96 h-full md:block">
        <img src={AuthImage} alt="" className="object-cover h-full w-full" />
      </section>
      <section className="px-5 py-10  sm:px-10 md:ml-96">
        <Outlet />
      </section>
    </main>
  );
};

export default UnprotectedRoutes;
