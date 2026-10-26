import React from 'react';

function Hotels({ trip }) {
 
    // FIX: Ensure this path matches your new prompt
    // (trip.tripData contains the parsed 'travelPlan' object)
    const hotelOptions = trip?.tripData?.hotelsOptions; 

    // Safety check before mapping
    if (!hotelOptions || !Array.isArray(hotelOptions) || hotelOptions.length === 0) {
        return null; // Don't render if no hotels
    }

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl border-b pb-2 mb-6'>🏨 Recommended Hotels</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {hotelOptions.map((item, index) => (
                    
                    <div key={index} className='border rounded-xl overflow-hidden shadow-md hover:scale-105 transition-all cursor-pointer'>
                        <img
                            src={"/placeholder.jpg"} 
                            className='h-40 w-full object-cover'
                            alt={`Hotel: ${item.hotelName}`} 
                        />
                        <div className='p-4'>
                            <h3 className='font-bold text-lg'>{item.hotelName}</h3>
                            <p className='text-xs text-gray-500 line-clamp-1'>📍 {item.hotelAddress}</p>
                            <p className='text-sm font-semibold mt-2'>💰 Price: {item.pricePerNightINR || item.Price}</p>
                            <p className='text-sm text-gray-600 mt-1.5 line-clamp-2'>{item.ratingDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hotels;