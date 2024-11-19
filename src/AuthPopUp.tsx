import React, { useEffect } from "react";
import { AuthType, init } from "@thoughtspot/visual-embed-sdk";
import { createClientWithoutAuth } from "./Util";
import { TS_URL } from "./App";



const AuthPopUp: React.FC = () => {
  useEffect(() => {
    const authenticate = async () => {
      try {
        await init({
          thoughtSpotHost: TS_URL, // Replace with your ThoughtSpot host
          authType: AuthType.SAMLRedirect
        });
        let client =  createClientWithoutAuth(TS_URL);
        client.getSystemInformation().then((data: any) => {
            window.opener?.postMessage({ status: "success" }, "*");
            window.close(); // Close the popup
        }).catch((error: any) => {
            console.error("Authentication failed:", error);
        })
        // Notify the main window about successful authentication

      } catch (error) {
        console.error("Authentication failed:", error);
        // Display an error message
        document.body.innerHTML = `<p style="color: red;">Authentication Failed</p>`;
      }
    };

    authenticate();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-xl font-semibold text-gray-800">Signing In...</h1>
    </div>
  );
};

export default AuthPopUp;
