import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options.jsx';
import { toast, Toaster } from 'sonner';

import { chat } from '@/service/AIModel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CreateTrip() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    
    useEffect(() => {
        console.log("Form Data Updated:", formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
        onError: (error) => console.log(error)
    });

    const OnGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (!formData.location || !formData.days || !formData.budget || !formData.traveler) {
            toast("Please fill all details before generating a trip.");
            return;
        }

        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData.location.properties.formatted)
            .replace('{days}', formData.days)
            .replace('{traveler}', formData.traveler)
            .replace('{budget}', formData.budget);
        
        try {
            const result = await chat(FINAL_PROMPT);
            // Get the docId back from the save function
            const docId = await SaveAiTrip(result);
            
            // If saving was successful, navigate
            if (docId) {
                navigate('/view-trip/' + docId);
            }
        } catch (error) {
            console.error("AI chat failed:", error);
            toast("Something went wrong with the AI request.");
        } finally {
            setLoading(false);
        }
    };

    // This function now only saves the trip and returns the ID
    const SaveAiTrip = async (TripData) => {
        console.log("Attempting to save trip to Firebase...");
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();

        try {
            let tripDataToSave;
            try {
                tripDataToSave = JSON.parse(TripData);
            } catch (e) {
                tripDataToSave = TripData; 
            }

            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: tripDataToSave,
                userEmail: user?.email,
                id: docId
            });

            toast.success("Your trip has been saved successfully!");
            return docId; // Return the ID on success

        } catch (error) {
            console.error("🔥 Firebase Save Error:", error);
            toast.error("Could not save your trip. Please try again.");
            return null; // Return null on failure
        }
    };

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            OnGenerateTrip();
        });
    };

    return (
        <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
            <Toaster />
            <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
                <h2 className='font-bold text-3xl'>Tell us your travel preferences 🌴🚞</h2>
                <p className='mt-3 text-gray-500 text-xl'>
                    Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
                </p>

                <div className='mt-20 flex flex-col gap-10'>
                    {/* Destination */}
                    <div>
                        <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                        <GeoapifyGeocoderAutocomplete
                            placeholder="Search for a city or destination..."
                            placeSelect={(value) => handleInputChange('location', value)}
                        />
                    </div>

                    {/* Number of Days */}
                    <div>
                        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                        <input
                            type='number'
                            name="days"
                            placeholder='Ex. 3'
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-lg'
                        />
                    </div>

                    {/* Budget */}
                    <div>
                        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                        <div className='grid grid-cols-3 gap-5 mt-5'>
                            {SelectBudgetOptions.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleInputChange('budget', item.title)}
                                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                                        ${formData.budget === item.title ? 'shadow-lg border-blue-500' : 'border-gray-300'}
                                    `}
                                >
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Travelers */}
                    <div>
                        <h2 className='text-xl my-5 font-medium'>Who do You plan on travelling with?</h2>
                        <div className='grid grid-cols-3 gap-5 mt-5'>
                            {SelectTravelesList.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleInputChange('traveler', item.people)}
                                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                                        ${formData.traveler === item.people ? 'shadow-lg border-blue-500' : 'border-gray-300'}
                                    `}
                                >
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='my-10 justify-end flex'>
                    <button
                        disabled={loading}
                        className='bg-blue-500 text-white p-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400'
                        onClick={OnGenerateTrip}
                    >
                        {loading ?
                            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
                        }
                    </button>
                </div>

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription className="text-center">
                                <img src="/logo.svg" alt="Logo" className="mx-auto mb-4" />
                                <h2 className='font-bold text-lg'>Sign In With Google</h2>
                                <p>Sign in to the App with Google authentication securely</p>
                                <Button
                                    onClick={() => login()}
                                    className="w-full mt-5 flex gap-4 items-center"
                                >
                                    <FcGoogle className='h-7 w-7' />
                                    Sign In With Google
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* The AI response is no longer displayed on this page */}
            </div>
        </GeoapifyContext>
    );
}

export default CreateTrip;