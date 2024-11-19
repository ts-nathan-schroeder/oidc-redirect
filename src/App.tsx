import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPopUp from "./AuthPopUp";
import { AuthType, init, LiveboardEmbed, logout } from "@thoughtspot/visual-embed-sdk/react";

export const TS_URL = "https://se-thoughtspot-cloud.thoughtspot.cloud/";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize ThoughtSpot
  init({
    thoughtSpotHost: TS_URL,
    authType: AuthType.None,
  });

  const handleSignIn = () => {
    const authWindow = window.open(
      "/popup",
      "ThoughtSpotAuth",
      "width=500,height=600"
    );

    if (!authWindow) {
      alert("Please enable popups for this site.");
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data.status === "success") {
        setIsAuthenticated(true);
        window.removeEventListener("message", handleMessage);
      }
    };

    window.addEventListener("message", handleMessage);
  };

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Main App */}
        <Route
          path="/"
          element={
            <div className="flex min-h-screen min-w-screen w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
              {!isAuthenticated ? (
                <div className="flex flex-col items-center text-center space-y-6 h-screen">
                  <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to My App
                  </h1>
                  <button
                    onClick={handleSignIn}
                    className="px-8 py-4 text-lg text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
                  >
                    Sign In
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col">
                  <div className="flex justify-end p-4 bg-gray-200">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                  <div className="flex-grow">
                    <LiveboardEmbed
                      className="w-full h-full"
                      liveboardId="5fc750d7-dd94-4638-995c-31f0434ce2a0" // Replace with your Liveboard ID
                      frameParams={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          }
        />

        {/* Popup Route */}
        <Route path="/popup" element={<AuthPopUp />} />
      </Routes>
    </Router>
  );
};

export default App;
