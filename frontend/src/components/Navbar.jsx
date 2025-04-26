import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "All doctors", link: "/doctors" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  // Active link style function
  const navLinkStyles = ({ isActive }) => {
    return {
      borderBottom: isActive ? "2px solid var(--bg-primary)" : "none",
      paddingBottom: "4px",
      color: isActive ? "var(--bg-primary)" : ""
    };
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex items-center justify-between md:justify-between text-sm py-4 mb-5 border-b border-b-grey-400 px-4">
        {/* Sidebar Toggle Button - visible on small screens */}
        <button className="md:hidden" onClick={() => setShowMenu(true)}>
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </button>

        {/* Centered Logo on small, left-aligned on md+ */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
          <img
            onClick={() => navigate("/")}
            className="w-40 cursor-pointer"
            src={assets.logo}
            alt="logo"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-start mx-auto gap-10 font-medium ml-auto">
          {menuItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.link}
              style={navLinkStyles}
              className="py-1"
            >
              {item.name}
            </NavLink>
          ))}
        </ul>

        {/* Profile or Create Account */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt=""
              />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer">
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-black cursor-pointer">
                    My Appointments
                  </p>
                  <p
                    onClick={() => setToken(false)}
                    className="hover:text-black cursor-pointer">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[var(--bg-primary)] text-white px-8 py-3 rounded-full font-light">
              Create account
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {showMenu && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowMenu(false)}></div>
      )}

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-50 p-6 transform transition-transform duration-300 md:hidden ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setShowMenu(false)}>x</button>
        </div>
        <ul className="flex flex-col gap-4 font-medium">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              style={navLinkStyles}
              onClick={() => setShowMenu(false)}
              className="cursor-pointer hover:text-[var(--bg-primary)]"
            >
              {item.name}
            </NavLink>
          ))}
        </ul>
        <div className="mt-6 border-t pt-4">
          {token ? (
            <>
              <p
                onClick={() => {
                  setShowMenu(false);
                  navigate("/my-profile");
                }}
                className="cursor-pointer hover:text-[var(--bg-primary)]">
                My Profile
              </p>
              <p
                onClick={() => {
                  setShowMenu(false);
                  navigate("/my-appointments");
                }}
                className="cursor-pointer hover:text-[var(--bg-primary)]">
                My Appointments
              </p>
              <p
                onClick={() => setToken(false)}
                className="cursor-pointer hover:text-[var(--bg-primary)]">
                Logout
              </p>
            </>
          ) : (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
              className="bg-[var(--bg-primary)] text-white w-full py-2 rounded-full mt-4">
              Create account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;