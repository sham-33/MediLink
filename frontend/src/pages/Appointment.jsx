

import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="px-4 md:px-6 py-4 max-w-6xl mx-auto">
        {/* Doctor details - Responsive card layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor image - Full width on mobile, fixed width on desktop */}
          <div className="w-full md:w-72 flex-shrink-0">
            <img
              className="bg-[var(--bg-primary)] w-full h-auto rounded-lg object-cover"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          {/* Doctor info card - Full width with proper padding */}
          <div className="flex-1 border border-gray-400 rounded-lg p-4 md:p-8 bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-medium text-gray-900">
                {docInfo.name}
              </h2>
              <img className="w-5" src={assets.verified_icon} alt="" />
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* Doctor about */}
            <div className="mt-4">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {docInfo.about}
              </p>
            </div>
            
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
          
        {/* Booking slots - Properly contained with scrollable areas */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-3">Booking slots</h3>
          
          {/* Date selection - Properly scrollable on mobile */}
          <div className="relative">
            <div className="flex gap-3 items-center overflow-x-auto pb-2 scrollbar-hide">
              {docSlots.length > 0 && docSlots.map((item, index) => (
                <div 
                  onClick={() => setSlotIndex(index)} 
                  className={`text-center py-4 px-2 min-w-16 rounded-lg cursor-pointer flex-shrink-0 transition-colors
                    ${slotIndex === index ? 'bg-[var(--bg-primary)] text-white' : 'border border-gray-200'}`} 
                  key={index}
                >
                  <p className="text-sm">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p className="font-medium">{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Time selection - Properly scrollable on mobile */}
          <div className="relative mt-4">
            <div className="flex flex-wrap gap-2 mt-2">
              {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                <p 
                  onClick={() => setSlotTime(item.time)} 
                  className={`text-sm flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-colors
                    ${item.time === slotTime ? 'bg-[var(--bg-primary)] text-white' : 'text-gray-500 border border-gray-300'}`} 
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
            </div>
          </div>
          
          {/* Book button - Full width on mobile, auto on desktop */}
          <button className="w-full md:w-auto bg-[var(--bg-primary)] text-white font-medium px-6 py-3 rounded-lg my-6 hover:opacity-90 transition-opacity">
            Book an Appointment
          </button>
        </div>

        {/* Related doctors section */}
        <div className="mt-6">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;