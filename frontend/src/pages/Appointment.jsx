import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(1); // Start with tomorrow by default
  const [slotTime, setSlotTime] = useState("");
  const [currentDate] = useState(new Date());

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      // If today and already past 9 PM, skip today
      if (i === 0 && new Date() > endTime) {
        continue;
      }

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const isTodayDisabled = (index) => {
    if (!docSlots[index] || !docSlots[index][0]) return false;

    const now = new Date();
    return docSlots[index].every((slot) => slot.datetime < now);
  };

  return (
    docInfo && (
      <div className="px-4 md:px-6 py-4 max-w-6xl mx-auto">
        {/* Doctor details */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-72 flex-shrink-0">
            <img
              className="bg-[var(--bg-primary)] w-full h-auto rounded-lg object-cover"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

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

            <div className="mt-4">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
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

        {/* Booking slots */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-3">Booking slots</h3>

          {/* Date selection */}
          <div className="relative">
            <div className="flex gap-3 items-center overflow-x-auto pb-2 scrollbar-hide">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => {
                  const isDisabled = isTodayDisabled(index);

                  return (
                    <div
                      onClick={() => !isDisabled && setSlotIndex(index)}
                      className={`text-center py-4 px-2 min-w-16 rounded-lg ${
                        !isDisabled ? "cursor-pointer" : "cursor-not-allowed"
                      } flex-shrink-0 transition-colors
                      ${
                        slotIndex === index && !isDisabled
                          ? "bg-[var(--bg-primary)] text-white"
                          : ""
                      }
                      ${
                        isDisabled
                          ? "bg-gray-200 text-gray-400"
                          : "border border-gray-200"
                      }`}
                      key={index}
                    >
                      <p className="text-sm">
                        {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                      </p>
                      <p className="font-medium">
                        {item[0] && item[0].datetime.getDate()}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Time selection */}
          <div className="relative mt-4">
            <div className="flex flex-wrap gap-2 mt-2">
              {docSlots.length > 0 &&
                docSlots[slotIndex] &&
                docSlots[slotIndex].map((item, index) => (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-colors
                    ${
                      item.time === slotTime
                        ? "bg-[var(--bg-primary)] text-white"
                        : "text-gray-500 border border-gray-300"
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>
          </div>

          {/* Book button */}
          <button
            className={`w-full md:w-auto bg-[var(--bg-primary)] text-white font-medium px-6 py-3 rounded-lg my-6 
              ${
                slotTime
                  ? "hover:opacity-90 transition-opacity"
                  : "opacity-50 cursor-not-allowed"
              }`}
            disabled={!slotTime}
          >
            Book an Appointment
          </button>
        </div>

        {/* Related doctors */}
        <div className="mt-6">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;
