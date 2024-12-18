import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
  })
);

export async function GET() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user_good' },
      client_name: 'Plaid Test App',
      products: ['auth'],
      country_codes: ['US'],
      language: 'en',
      webhook: process.env.PLAID_WEBHOOK_URL,
      redirect_uri: process.env.PLAID_REDIRECT_URI,
    });

    return new Response(JSON.stringify({ link_token: response.data.link_token }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error creating link token:', error);
    return new Response('Error creating link token', { status: 500 });
  }
}
