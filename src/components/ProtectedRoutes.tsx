import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedRoutes = () => {
  const [isLoggedIn] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <main>
      <Sidebar />
      <section className="flex md:ml-[220px]">
        <div className="bg-[#f5f5f5] flex-1">
          <div className="px-5 py-2 ">
            <div className="bg-white rounded-full shadow-lg shadow-primary-100 flex items-center justify-center gap-2 px-5">
              <span>i</span>
              <input
                type="text"
                name="search"
                value={searchInput}
                onChange={handleInputChange}
                className={` w-full flex-1 text-sm p-3.5 py-3 rounded-md outline-none border-none font-medium  bg-transparent text-primary-400 placeholder:font-medium placeholder:text-sm placeholder:text-primary-200 focus:border-primary-100 `}
                placeholder="Search"
              />
            </div>
          </div>
          <Outlet />
        </div>
        <div className="hidden w-52 h-full bg-green-500 lg:block">
          {" "}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          debitis ullam rerum enim odio quisquam. Adipisci, nisi nam, ducimus
          sed aperiam assumenda perferendis aspernatur quos magni labore
          pariatur dignissimos natus?
        </div>
      </section>
    </main>
  );
};

export default ProtectedRoutes;
