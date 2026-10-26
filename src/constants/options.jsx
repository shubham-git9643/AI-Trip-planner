export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'Having a great family time',
        icon:'👨‍👩‍👧‍👦',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'👨‍👩‍👧‍👦',
        people:'5 to 10 people'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💸',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'🤑',
    },
]

export const AI_PROMPT = `Generate a Travel Plan for Location: {location}, for {days} Days for a {traveler} with a {budget} budget.

Your response MUST be in a single, valid JSON format. Do not include any text, explanations, or markdown formatting before or after the JSON object.

The JSON object must have two main keys: 'hotelsOptions' and 'itinerary'.

1.  **'hotelsOptions'**: An array of hotel objects. Each hotel object must include:
    * "hotelName" (string)
    * "hotelAddress" (string)
    * "pricePerNightINR" (number or string)
    * "hotelImageURL" (string)
    * "geoCoordinates" (object with "latitude" and "longitude")
    * "ratingDescription" (string)

2.  **'itinerary'**: An array of day-plan objects. Each day-plan object must include:
    * "dayNumber" (number, e.g., 1)
    * "theme" (string)
    * "bestTimeToVisit" (string)
    * "plan" (an array of activity objects)

3.  Each activity object inside the 'plan' array must include:
    * "placeName" (string)
    * "placeDetails" (string)
    * "placeImageURL" (string)
    * "geoCoordinates" (object with "latitude" and "longitude")
    * "ticketPricing" (can be a string like "Free" or an object like {"Indian": "₹90", "Foreigner": "₹500"})
    * "rating" (number)
    * "timeToTravel" (string, e.g., "2-3 hours")
`;