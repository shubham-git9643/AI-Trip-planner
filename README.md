# 🌍 AI Trip Planner

An intelligent travel planning web app powered by **Google Gemini AI**. Simply tell it your destination, travel duration, budget, and travel companions — and it generates a complete, personalized itinerary for you in seconds.

![AI Trip Planner](https://img.shields.io/badge/Built%20with-React%20%2B%20Vite-blue?style=for-the-badge&logo=react)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-orange?style=for-the-badge&logo=google)
![Firebase](https://img.shields.io/badge/Backend-Firebase-yellow?style=for-the-badge&logo=firebase)

---

## ✨ Features

- 🤖 **AI-Powered Itineraries** — Uses Google Gemini 2.5 Flash to generate personalized day-by-day travel plans
- 📍 **Smart Location Search** — Geoapify geocoder autocomplete for destination selection
- 💰 **Budget Selection** — Choose from budget-friendly, moderate, or luxury travel options
- 👥 **Traveler Profiles** — Solo, couple, family, or group trip customization
- 🔐 **Google OAuth Login** — Secure sign-in with Google authentication
- ☁️ **Firebase Storage** — Generated trips are saved to Firestore and accessible anytime
- 📱 **Responsive Design** — Works seamlessly across all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7 |
| Styling | Tailwind CSS v4, shadcn/ui |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Auth | Google OAuth (`@react-oauth/google`) |
| Database | Firebase Firestore |
| Location | Geoapify Geocoder Autocomplete |
| Routing | React Router DOM v7 |
| Notifications | Sonner |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- A **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)
- A **Firebase project** — [Create one here](https://console.firebase.google.com/)
- A **Geoapify API Key** — [Get one here](https://www.geoapify.com/)
- A **Google OAuth Client ID** — [Create one here](https://console.cloud.google.com/apis/credentials)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubham-git9643/AI-Trip-planner.git
   cd AI-Trip-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key_here
   VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id_here
   VITE_GEOAPIFY_API_KEY=your_geoapify_api_key_here
   ```

4. **Configure Firebase**

   Update `src/service/firebaseConfig.jsx` with your own Firebase project credentials.

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── custom/
│   │   ├── Header.jsx        # Navigation header with user auth
│   │   └── Hero.jsx          # Landing page hero section
│   └── ui/                   # shadcn/ui components (Button, Dialog, etc.)
├── constants/
│   └── options.jsx           # Budget options, traveler types & AI prompt template
├── create-trip/
│   └── index.jsx             # Trip creation form & AI generation logic
├── view-trip/
│   ├── [tripId]/
│   │   └── index.jsx         # Trip detail page
│   └── components/
│       ├── Hotels.jsx        # Hotel recommendations section
│       ├── InfoSection.jsx   # Trip summary info
│       ├── PlaceCardItem.jsx # Individual place card
│       └── PlacesToVisit.jsx # Day-by-day itinerary
├── service/
│   ├── AIModel.jsx           # Google Gemini AI integration
│   └── firebaseConfig.jsx    # Firebase initialization
└── main.jsx                  # App entry point with routing
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GOOGLE_GEMINI_AI_API_KEY` | Google Gemini AI API key for trip generation |
| `VITE_GOOGLE_AUTH_CLIENT_ID` | Google OAuth 2.0 Client ID for user authentication |
| `VITE_GEOAPIFY_API_KEY` | Geoapify API key for location search autocomplete |

> ⚠️ **Never commit your `.env.local` file to version control.** It is already listed in `.gitignore`.

---

## 🧭 How It Works

1. **Landing Page** — User lands on the hero page and clicks "Get Started"
2. **Trip Form** — User fills in destination, number of days, budget, and travel group
3. **Google Sign-In** — If not logged in, a Google OAuth prompt appears
4. **AI Generation** — The app sends a structured prompt to Gemini AI
5. **Save to Firebase** — The generated trip is saved to Firestore with a unique ID
6. **View Itinerary** — User is redirected to a detailed trip view with hotels and day-by-day plans

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or issue.

---

<p align="center">Made with ❤️ using React, Gemini AI & Firebase</p>
