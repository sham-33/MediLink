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
      <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400 px-4 md:px-8">
        {/* Logo and Menu Button Container */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Sidebar Toggle Button - visible on small screens */}
          <button className="md:hidden mr-4" onClick={() => setShowMenu(true)}>
            <img src={assets.menu_icon} alt="menu" className="w-6" />
          </button>

          {/* Logo - positioned naturally on the left */}
          <div className="flex-1 flex justify-center md:justify-start">
            <img
              onClick={() => navigate("/")}
              className="w-30 md:w-30 cursor-pointer"
              src={assets.logo}
              alt="logo"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-start gap-10 font-medium">
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
        
        {/* Mobile account button */}
        <div className="md:hidden">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt=""
                onClick={() => setShowMenu(true)}
              />
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[var(--bg-primary)] text-white px-4 py-2 rounded-full text-xs font-light">
              Login
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
  className={`fixed top-0 left-0 w-64 h-full bg-white shadow-2xl z-50 p-6 transform transition-transform duration-300 md:hidden ${
    showMenu ? "translate-x-0" : "-translate-x-full"
  } rounded-tr-3xl rounded-br-3xl`}
>
  {/* Header */}
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
    <button onClick={() => setShowMenu(false)} className="text-3xl font-semibold text-gray-600 hover:text-black transition">
      ×
    </button>
  </div>

  {/* Menu Items */}
  <ul className="flex flex-col gap-5 font-medium text-gray-700">
    {menuItems.map((item) => (
      <NavLink
        key={item.name}
        to={item.link}
        style={navLinkStyles}
        onClick={() => setShowMenu(false)}
        className="cursor-pointer hover:text-[var(--bg-primary)] transition"
      >
        {item.name}
      </NavLink>
    ))}
  </ul>

  {/* Bottom Section */}
  <div className="mt-10 border-t pt-6 flex flex-col gap-4">
    {token ? (
      <>
        <p
          onClick={() => {
            setShowMenu(false);
            navigate("/my-profile");
          }}
          className="cursor-pointer hover:text-[var(--bg-primary)] transition"
        >
          My Profile
        </p>
        <p
          onClick={() => {
            setShowMenu(false);
            navigate("/my-appointments");
          }}
          className="cursor-pointer hover:text-[var(--bg-primary)] transition"
        >
          My Appointments
        </p>
        <p
          onClick={() => setToken(false)}
          className="cursor-pointer hover:text-[var(--bg-primary)] transition"
        >
          Logout
        </p>
      </>
    ) : (
      <button
        onClick={() => {
          setShowMenu(false);
          navigate("/login");
        }}
        className="bg-[var(--bg-primary)] text-white w-full py-3 rounded-full mt-4 hover:brightness-110 transition"
      >
        Create account
      </button>
    )}
  </div>
</div>

    </div>
  );
};

export default Navbar;