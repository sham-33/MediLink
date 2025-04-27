import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
// import { useState } from "react";
// import { useEffect } from "react";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-6">
      <p className="text-gray-600 text-sm md:text-base">
        Browse through the doctors specialist.
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded-full text-sm transition-all sm:hide ${
            showFilter ? "bg-[var(--bg-primary)] text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}>
          Filters
        </button>
        <div className={`flex-col sm:flex-col overflow-x-auto pb-3 sm:pb-0 w-full sm:w-auto gap-2 sm:gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`whitespace-nowrap flex-shrink-0 pl-3 py-2 pr-6 sm:pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-[var(--bg-brown)] text-black"
                : " "
            }`}>
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`whitespace-nowrap flex-shrink-0 pl-3 py-2 pr-6 sm:pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
              speciality === "Gynecologist"
                ? "bg-[var(--bg-brown)] text-black"
                : " "
            }`}>
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`whitespace-nowrap flex-shrink-0 pl-3 py-2 pr-6 sm:pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
              speciality === "Dermatologist"
                ? "bg-[var(--bg-brown)] text-black"
                : " "
            }`}>
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`whitespace-nowrap flex-shrink-0 pl-3 py-2 pr-6 sm:pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
              speciality === "Pediatricians"
                ? "bg-[var(--bg-brown)] text-black"
                : " "
            }`}>
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`whitespace-nowrap flex-shrink-0 pl-3 py-2 pr-6 sm:pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
              speciality === "Neurologist"
                ? "bg-[var(--bg-brown)] text-black"
                : " "
            }`}>
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`whitespace-nowrap flex-shrink-0 pl-3 py-2 pr-6 sm:pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-[var(--bg-brown)] text-black"
                : " "
            }`}>
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:shadow-md transition-all duration-300"
              key={index}>
              <div className="aspect-square overflow-hidden">
                <img
                  className="w-full h-full object-cover bg-[var(--bg-brown)]"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-base sm:text-lg font-medium mt-1 line-clamp-1">
                  {item.name}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-1">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
