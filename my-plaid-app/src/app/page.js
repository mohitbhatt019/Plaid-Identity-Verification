"use client";

import { useEffect, useState } from "react";
import { fetchLinkToken, getIdentityVerification } from "./services/plaidService"; 
import "./styles/globals.css"; 
import { PlaidLink } from "react-plaid-link"; 

// Main component to handle bank account linking and identity verification
export default function Home() {
  const [linkToken, setLinkToken] = useState(null); 
  const [accessToken, setAccessToken] = useState(null); 
  const [statusMessage, setStatusMessage] = useState(""); 

  // Fetch the Plaid link token when the component mounts
  useEffect(() => {
    getLinkToken();
  }, []);

  // Fetch the link token to initiate PlaidLink process
  const getLinkToken = async () => {
    try {
      const token = await fetchLinkToken(); 
      setLinkToken(token); 
    } catch (error) {
      console.error("Error fetching link token:", error); // Handle error in fetching link token
    }
  };

  // Handle success callback from PlaidLink
  const handleOnSuccess = async (public_token, metadata) => {
    try {
      const { link_session_id } = metadata; 

      // Call service to get identity verification status using the session ID
      const data = await getIdentityVerification(link_session_id);
      setAccessToken(data.access_token); // Store the access token for future use

      // Set status message based on identity verification result
      if (data.status === "success") {
        setStatusMessage("Identity verification is successful!");
      } else if (data.status === "failed") {
        setStatusMessage("Identity verification has failed.");
      } else {
        setStatusMessage("Identity verification status is unknown.");
      }
    } catch (error) {
      console.error("Error handling success:", error); 
      setStatusMessage("An error occurred during identity verification.");
    }
  };

  return (
    <div
      style={{
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Connect Your Bank Account</h1> 
      
      {/* Only show PlaidLink button if the link token has been successfully fetched */}
      {linkToken && (
        <PlaidLink
          token={linkToken} 
          onSuccess={handleOnSuccess} // Handle success after linking account
          style={{
            color: "black", 
            backgroundColor: "white", 
            padding: "10px 15px", 
            borderRadius: "10px", 
            fontWeight: "bold",
            fontSize: "14px",
            textAlign: "center",
            cursor: "pointer",
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          Link your account
        </PlaidLink>
      )}

      {/* Show "Initiate Identity Verification" button if access token is available */}
      {accessToken && (
        <button
          style={{
            marginTop: "120px",
            padding: "10px 20px",
            backgroundColor: "#0070f3", 
            color: "#ffffff", 
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleInitiateVerification} // Function to initiate identity verification (if needed)
        >
          Initiate Identity Verification
        </button>
      )}

      {/* Display status message based on verification result */}
      {statusMessage && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: statusMessage.includes("failed") ? "red" : "green", // Green for success, red for failure
          }}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}
