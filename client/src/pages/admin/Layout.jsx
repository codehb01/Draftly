import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { LayoutGroupContext } from "motion/react";
import Sidebar from "../../components/admin/Sidebar.jsx";
import { useAppContext } from "../../context/AppContext.jsx";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };
  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12">
        <img
          src={assets.logo}
          alt=""
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        ></img>
        <button
          onClick={logout}
          className="text sm:w-40 px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
