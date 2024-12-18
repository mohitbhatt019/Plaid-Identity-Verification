  // src/plaid/plaid.service.ts
  import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
  import axios from 'axios';

  @Injectable()
  export class PlaidService {
    private readonly plaidClientId = process.env.PLAID_CLIENT_ID;
    private readonly plaidSecret = process.env.PLAID_SECRET;
    private readonly plaidWebhook = process.env.PLAID_WEBHOOK;
    private readonly plaidRedirectUri = process.env.PLAID_REDIRECT_URI;
    private readonly plaidTemplate = process.env.TEMPLATE_ID;

    /**
     * Creates a Plaid link token to initiate the bank account linking process.
     * This token is required for starting the Plaid Link flow in the front-end.
     * @returns {string} - The generated link token used in the Plaid Link flow.
     */
    async createLinkToken() {
      const plaidRequestData = {
        client_id: this.plaidClientId,
        secret: this.plaidSecret,
        client_name: 'Shan Zhao LLC',
        user: { client_user_id: Math.random().toString() },
        products: ['identity_verification'],
        country_codes: ['US'],
        language: 'en',
        webhook: this.plaidWebhook,
        redirect_uri: this.plaidRedirectUri,
        identity_verification: {
          template_id: this.plaidTemplate,
        },
      };

      try {
        const response = await axios.post(
          `${process.env.PLAID_BASE_URL}link/token/create`,
          plaidRequestData,
          { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data.link_token;
      } catch (error) {
        throw new HttpException('Failed to create Plaid link token', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  
    /**
     * Exchanges a public token (obtained from Plaid Link) for an access token.
     * The access token allows the backend to access the user's financial data.
     * @param {string} public_token - The public token received from Plaid Link.
     * @returns {object} - An object containing the access token and item ID.
     */
    async exchangePublicToken(public_token: string) {
      const plaidRequestData = {
        client_id: this.plaidClientId,
        secret: this.plaidSecret,
        public_token: public_token,
      };

      try {
        const response = await axios.post(
          `${process.env.PLAID_BASE_URL}item/public_token/exchange`,
          plaidRequestData,
          { headers: { 'Content-Type': 'application/json' } }
        );
        return {
          access_token: response.data.access_token,
          item_id: response.data.item_id,
        };
      } catch (error) {
        throw new HttpException('Failed to exchange public token', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }



  /**
     * Fetches the details of an identity verification process using the identity verification ID.
     * This is typically called to check the status or retrieve the results of the verification.
     * @param {string} identity_verification_id - The ID of the identity verification process.
     * @returns {object} - The response from Plaid API containing verification details.
     */
    async getIdentityVerification(identity_verification_id: string) {
      const plaidRequestData = {
        client_id: this.plaidClientId,
        secret: this.plaidSecret,
        identity_verification_id,
      };

      try {
        const response = await axios.post(
          `${process.env.PLAID_BASE_URL}identity_verification/get`,
          plaidRequestData,
          { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
      } catch (error) {
        throw new HttpException('Failed to get identity verification', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  }


