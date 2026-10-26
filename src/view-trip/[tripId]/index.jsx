import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast, Toaster } from 'sonner'; // Import Toaster
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels'; // Corrected path assuming components are siblings
import PlacesToVisit from '../components/PlacesToVisit';

function ViewTrip() { // Renamed to follow standard React naming convention (PascalCase)
    const { tripId } = useParams();
    // FIX 1: Initialize state to null
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const fetchedData = docSnap.data();
            console.log("Fetched Firebase Document:", fetchedData);

            let processedTripData = fetchedData.tripData; // Start with raw data

            // FIX 2: Add JSON parsing logic
            if (typeof fetchedData.tripData === 'string') {
                console.log("Attempting to parse tripData string...");
                try {
                    // Clean the string (remove backticks/whitespace)
                    const jsonString = fetchedData.tripData.replace(/```json|```/g, '').trim();
                    const parsedJson = JSON.parse(jsonString);
                    console.log("Parsed JSON:", parsedJson);

                    // Assume the structure is nested under 'travelPlan' based on previous info
                    if (parsedJson && parsedJson.travelPlan) {
                        processedTripData = parsedJson.travelPlan;
                        console.log("Extracted travelPlan object:", processedTripData);
                    } else {
                        // Use the whole parsed object if 'travelPlan' key isn't found
                        processedTripData = parsedJson;
                        console.log("Using directly parsed object:", processedTripData);
                    }
                } catch (e) {
                    console.error("Failed to parse tripData JSON:", e);
                    toast.error("Could not parse itinerary data.");
                    // Keep raw string if parsing fails
                }
            } else {
                 console.log("tripData is not a string, using as is.");
            }

            // Prepare the final state object
            const finalTripState = {
                ...fetchedData, // Keep userSelection, id, userEmail
                tripData: processedTripData // Overwrite tripData with processed version
            };

            console.log("Final object structure for setTrip:", finalTripState);
            setTrip(finalTripState);
        } else {
            console.log("No Such Document for tripId:", tripId);
            toast('No trip Found!');
        }
    };

    // Show loading state while fetching
    if (!trip) {
        return <div className='p-10 text-center text-gray-500'>Loading your trip details...</div>;
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <Toaster /> {/* Add Toaster here to display notifications */}
            {/* Information Section */}
                <InfoSection trip={trip} />

            {/* Recommended Hotels */}
                <Hotels trip={trip} />

            {/* Daily Plan */}
                <PlacesToVisit trip={trip} />
            {/* You will add the DailyPlan component here later */}
        </div>
    );
}

// Ensure component name uses PascalCase
export default ViewTrip;