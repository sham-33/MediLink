import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
      color: isActive ? "var(--bg-primary)" : "",
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
              className="py-1">
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
                onClick={() => setShowProfileMenu(true)}
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
      </div>      {/* Main Menu Sidebar Overlay */}
      {showMenu && (
        <div
          className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 z-40 md:hidden"
          onClick={() => setShowMenu(false)}></div>
      )}

      {/* Main Menu Sidebar Content */}      <div
        className={`fixed top-0 left-0 w-52 h-full bg-white shadow-2xl z-50 p-6 transform transition-transform duration-300 md:hidden ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } rounded-tr-3xl rounded-br-3xl`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={() => setShowMenu(false)}
            className="text-3xl font-semibold text-gray-600 hover:text-black transition">
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
              className="cursor-pointer hover:text-[var(--bg-primary)] transition">
              {item.name}
            </NavLink>
          ))}
        </ul>
      </div>      {/* Profile Menu Overlay */}
      {showProfileMenu && (
        <div
          className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 z-40 md:hidden"
          onClick={() => setShowProfileMenu(false)}></div>
      )}

      {/* Profile Menu Content */}
      {token && (
        <div
          className={`fixed top-0 right-0 w-50 h-60 bg-white shadow-2xl z-50 p-6 transform transition-transform duration-300 md:hidden ${
            showProfileMenu ? "translate-x-0" : "translate-x-full"
          } rounded-tl-3xl rounded-bl-3xl`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
            <button
              onClick={() => setShowProfileMenu(false)}
              className="text-3xl font-semibold text-gray-600 hover:text-black transition">
              ×
            </button>
          </div>

          {/* Profile Options */}
          <div className="flex flex-col gap-5 font-medium text-gray-700">
            <p
              onClick={() => {
                setShowProfileMenu(false);
                navigate("/my-profile");
              }}
              className="cursor-pointer hover:text-[var(--bg-primary)] transition">
              My Profile
            </p>
            <p
              onClick={() => {
                setShowProfileMenu(false);
                navigate("/my-appointments");
              }}
              className="cursor-pointer hover:text-[var(--bg-primary)] transition">
              My Appointments
            </p>
            <p
              onClick={() => {
                setToken(false);
                setShowProfileMenu(false);
              }}
              className="cursor-pointer hover:text-[var(--bg-primary)] transition">
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
