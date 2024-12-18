import axios from "axios";

/**
 * Fetch the link token from the backend using the base URL from environment variables.
 * @returns {Promise<string>} The link token.
 * @throws {Error} If the request fails.
 */
export const fetchLinkToken = async () => {
  try {
    const plaidBaseUrl = process.env.NEXT_PUBLIC_PLAID_Base_Url;

    if (!plaidBaseUrl) {
      throw new Error("Environment variable NEXT_PUBLIC_PLAID_Base_Url is not defined.");
    }

    const response = await axios.get(`${plaidBaseUrl}create-link-token`);
    return response.data.link_token;
  } catch (error) {
    console.error("Error fetching link token:", error);
    throw error;
  }
};

/**
 * Exchange the public token for an access token.
 * @param {string} publicToken - The public token received from Plaid.
 * @returns {Promise<Object>} The response data containing the access token.
 * @throws {Error} If the request fails.
 */
export const exchangePublicToken = async (publicToken) => {
  try {
    debugger
    const plaidBaseUrl = process.env.NEXT_PUBLIC_PLAID_Base_Url;
    const response = await axios.post(`${plaidBaseUrl}exchange-public-token`, {
      public_token: publicToken,
    });
    return response;
  } catch (error) {
    console.error("Error exchanging public token:", error);
    throw error;
  }
};

/**
 * Fetch identity verification data from the backend.
 * @param {string} identityVerificationId - The session ID for identity verification.
 * @returns {Promise<Object>} The API response.
 */
export const getIdentityVerification = async (identityVerificationId) => {debugger
  try {
    const response = await axios.post(
      "http://localhost:3000/plaid/get-identity-verification",
      { identity_verification_id: identityVerificationId }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching identity verification:", error);
    throw error;
  }
};

  


  