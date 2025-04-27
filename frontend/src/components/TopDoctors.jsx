import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 md:py-16 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-3 md:gap-4 mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-medium text-gray-900">Top Doctors to Book</h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Responsive grid with better mobile layout */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] bg-white"
          >
            <div className="aspect-square overflow-hidden">
              <img 
                className="w-full h-full object-cover bg-[var(--bg-brown)]" 
                src={item.image} 
                alt={item.name} 
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs md:text-sm text-green-500 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>
              
              <h3 className="text-gray-900 text-base md:text-lg font-medium line-clamp-1">
                {item.name}
              </h3>
              
              <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-1">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 md:mt-10">
        <button 
          onClick={() => {
            navigate('/doctors'); 
            scrollTo(0, 0);
          }} 
          className="bg-blue-50 text-gray-700 hover:bg-blue-100 px-8 md:px-12 py-2.5 md:py-3 rounded-full font-medium transition-colors"
        >
          View More Doctors
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;