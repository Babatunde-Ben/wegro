import { Outlet } from "react-router-dom";
import AuthImage from "../assets/images/image-1.jpeg";
const UnprotectedRoutes = () => {
  return (
    <main className="relative h-screen">
      <section className="hidden  fixed left-0 top-0 w-96 h-full md:block lg:w-[500px]">
        <img src={AuthImage} alt="" className="object-cover h-full w-full" />
      </section>
      <section className="px-5 py-10 bg-[#f3f3f3] sm:px-10 md:ml-96 lg:ml-[500px] lg:px-24">
        <Outlet />
      </section>
    </main>
  );
};

export default UnprotectedRoutes;
