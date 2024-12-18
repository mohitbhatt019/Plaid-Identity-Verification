// "use client";

// import React, { useEffect } from "react";
// import { exchangePublicToken } from "../services/plaidService";

// const PlaidLinkButton = ({ linkToken, onAccessTokenReceived }) => {
//   useEffect(() => {
//     const loadPlaid = async () => {
//       const script = document.createElement("script");
//       script.src = "https://cdn.plaid.com/link/v2/stable/link-initialize.js";
//       script.async = true;

//       script.onload = () => {
//         const handler = window.Plaid.create({
//           token: linkToken,
//           onSuccess: async (publicToken) => {
//             console.log("Public Token:", publicToken);

//             try {
//               const response = await exchangePublicToken(publicToken);
//               const { access_token: accessToken } = response.data;

//               console.log("Access Token:", accessToken);

//               // Call the parent callback with the access token
//               if (onAccessTokenReceived) {
//                 onAccessTokenReceived(accessToken);
//               }
//             } catch (error) {
//               console.error("Failed to exchange the public token:", error);
//             }
//           },
//         });

//         // Attach the event handler to open the Plaid Link flow
//         const button = document.getElementById("plaid-link-button");
//         if (button) {
//           button.addEventListener("click", () => handler.open());
//         }
//       };

//       document.body.appendChild(script);
//     };

//     if (linkToken) {
//       loadPlaid();
//     }
//   }, [linkToken, onAccessTokenReceived]);

//   return (
//     <button
//       id="plaid-link-button"
//       style={{
//         padding: "10px 20px",
//         backgroundColor: "#0070f3",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//       }}
//     >
//       Connect Bank Account
//     </button>
//   );
// };

// export default PlaidLinkButton;
