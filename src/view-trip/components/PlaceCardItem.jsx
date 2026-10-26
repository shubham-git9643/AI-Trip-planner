import React from 'react';

// 1. Accept the 'place' prop
function PlaceCardItem({ place }) { 
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-3 items-center'> {/* Added flex layout */}
      <img 
        src={'/placeholder.jpg'} // Use placeImageURL or fallback
        className='w-[100px] h-[100px] object-cover rounded-xl' // Adjusted size slightly
        // 2. Use the place name in the alt text
        alt={place.placeName || 'Activity placeholder'} 
      />
      {/* You can add text details here later */}
       {/* <div>
           <h4 className='font-semibold'>{place.placeName}</h4>
       </div> */}
    </div>
  );
}

export default PlaceCardItem;