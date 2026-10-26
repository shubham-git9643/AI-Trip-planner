import { Button } from '@/components/ui/button'
import React from 'react'
import { FaShare } from "react-icons/fa";

function InfoSection({ trip }) {
  return (
    <div className="w-full mt-6">
      {/* Hero Image */}
      <div className="relative">
        <img
          src="/placeholder.jpg"
          alt="Destination Cover"
          className="h-[340px] w-full object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Trip Info Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
        
        {/* Left: Location and tags */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
            {trip?.userSelection?.location?.properties?.formatted || "Unknown Destination"}
          </h2>

          <div className="flex flex-wrap gap-3">
            <span className="p-2 px-4 bg-gray-800 text-gray-100 rounded-full text-xs md:text-sm">
              📅 {trip?.userSelection?.days} Day Trip
            </span>
            <span className="p-2 px-4 bg-gray-800 text-gray-100 rounded-full text-xs md:text-sm">
              💰 {trip?.userSelection?.budget} Budget
            </span>
            <span className="p-2 px-4 bg-gray-800 text-gray-100 rounded-full text-xs md:text-sm">
              🥂 {trip?.userSelection?.traveler} Traveler(s)
            </span>
          </div>
        </div>

        {/* Right: Share Button */}
        <div className="flex justify-end w-full md:w-auto">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-400 hover:bg-gray-100 transition"
          >
            <FaShare className="text-gray-600" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
