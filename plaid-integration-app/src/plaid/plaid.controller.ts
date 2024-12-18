// src/plaid/plaid.controller.ts
import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import axios from 'axios';

// Define the PlaidController which will handle the API endpoints related to Plaid
@Controller('plaid')  // Define the base route for the API
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  /**
   * Endpoint to create a Plaid link token. This is needed to initialize the Plaid Link flow.
   * @returns {link_token} - The generated link token used to initiate Plaid Link.
   */
  @Get('create-link-token')
  async createLinkToken() {
    try {
      const linkToken = await this.plaidService.createLinkToken();
      return { link_token: linkToken };
    } catch (error) {
      throw new HttpException('Failed to create Plaid link token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Endpoint to exchange the public token for an access token. This allows the server
   * to interact with the user's financial data via the Plaid API.
   * @param {public_token} - The public token received from Plaid after linking the user's bank account.
   * @returns The access token needed for further interactions with Plaid.
   */
  @Post('exchange-public-token')
  async exchangePublicToken(@Body() body: { public_token?: string }) {
    if (!body.public_token) {
      throw new HttpException('Missing public_token in request body', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.plaidService.exchangePublicToken(body.public_token);
      return result;
    } catch (error) {
      throw new HttpException('Failed to exchange public token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /**
   * Endpoint to get the status of an identity verification session using the identity_verification_id.
   * @param {identity_verification_id} - The ID for the identity verification session.
   * @returns The current status of the identity verification session.
   */
  @Post('get-identity-verification')
  async getIdentityVerification(@Body() body: { identity_verification_id: string }) {
    if (!body.identity_verification_id) {
      throw new HttpException('Missing identity_verification_id in request body', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.plaidService.getIdentityVerification(body.identity_verification_id);
      return result;
    } catch (error) {
      throw new HttpException('Failed to get identity verification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
