import React from 'react';
import { FaClock, FaTicketAlt, FaStar, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa'; 
import PlaceCardItem from './PlaceCardItem'; 

function PlaceToVisit({ trip }) {
    // FIX: Use the correct path. The 'travelPlan' object is already in 'trip.tripData'.
    const itinerary = trip?.tripData?.itinerary; 

    // Helper functions
    const createMapSearchUrl = (placeName, coords) => {
        let query = placeName;
        if (coords?.latitude && coords?.longitude) {
            query = `${coords.latitude},${coords.longitude}`; 
        }
        return `https://developers.google.com/maps/documentation/javascript/places-migration-overview0`;
    };

    const formatTicketPrice = (pricing) => {
        if (typeof pricing === 'string') { return pricing; }
        if (typeof pricing === 'object' && pricing !== null) {
            const prices = [pricing.Indian, pricing.Foreigner].filter(Boolean);
            return prices.length > 0 ? prices.join(' / ') : 'Check Price';
        }
        return 'Check Price'; 
    };

    // This check is now working with the correct path
    if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
        return null; 
    }

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl border-b pb-2 mb-6'>🗺️ Daily Itinerary</h2>

            {itinerary.map((dayPlan, dayIndex) => (
                <div key={dayIndex} className='mb-8 border rounded-xl p-4 md:p-6 shadow-md bg-white'>
                    {/* Day Header */}
                    <div className='flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 mb-4 gap-2'>
                        <h3 className='font-extrabold text-lg md:text-xl text-blue-700'>
                            {dayPlan.day || `Day ${dayPlan.dayNumber}`}: {dayPlan.theme}
                        </h3>
                         <p className='text-xs md:text-sm text-gray-600 italic flex items-center gap-1'>
                           <FaRegClock className="h-3 w-3" />
                           <span>Best Time: {dayPlan.bestTimeToVisit}</span>
                        </p>
                    </div>

                    {/* Activities for the Day */}
                    <div className='space-y-6'>
                        {/* Safety check for dayPlan.plan */}
                        {dayPlan.plan && Array.isArray(dayPlan.plan) ? (
                            dayPlan.plan.map((activity, activityIndex) => (
                                <div key={activityIndex} className='border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm overflow-hidden p-4'>
                                    <div className="flex flex-col md:flex-row gap-4 items-start"> 
                                        <div className="flex-shrink-0">
                                             <PlaceCardItem place={activity} />
                                        </div>
                                        <div className="flex-grow"> 
                                            <div className='flex justify-between items-start mb-1'> 
                                                <h4 className='font-semibold text-md text-gray-800'>{activity.placeName}</h4>
                                                 <a 
                                                    href={createMapSearchUrl(activity.placeName, activity.geoCoordinates)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className='text-blue-500 hover:text-blue-700 transition-colors ml-2 flex-shrink-0'
                                                    title="View on Google Maps"
                                                >
                                                   <FaMapMarkerAlt className="h-4 w-4"/>
                                                 </a>
                                            </div>
                                            <p className='text-sm text-gray-600 mb-3'>{activity.placeDetails}</p> 
                                            <div className='flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700 pt-2 border-t'> 
                                                <div className='flex items-center gap-1' title="Estimated Time">
                                                    <FaClock className='h-3 w-3 text-gray-500' />
                                                    {activity.timeToTravel}
                                                </div>
                                                <div className='flex items-center gap-1' title="Rating">
                                                    <FaStar className='h-3 w-3 text-yellow-500' />
                                                    {activity.rating} / 5
                                                </div>
                                                <div className='flex items-center gap-1' title="Ticket Price">
                                                    <FaTicketAlt className='h-3 w-3 text-green-500' />
                                                    {formatTicketPrice(activity.ticketPricing)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">No specific activities planned for this day.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlaceToVisit;