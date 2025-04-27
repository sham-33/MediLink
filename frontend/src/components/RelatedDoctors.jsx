import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-10 md:my-16 text-gray-900 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-medium">Related Doctors</h1>
      <p className="text-center text-sm max-w-md">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5 gap-y-6">
        {relDoc.slice(0, 5).map((item, index) => (
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
              <p className="text-gray-900 text-base sm:text-lg font-medium mt-1 line-clamp-1">{item.name}</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-1">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      {relDoc.length > 0 && (
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-50 hover:bg-blue-100 text-gray-700 px-8 sm:px-12 py-2.5 sm:py-3 rounded-full mt-8 transition-colors">
          View More
        </button>
      )}
    </div>
  );
};

export default RelatedDoctors;