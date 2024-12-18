import Plaid from 'plaid';

const plaidClient = new Plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: process.env.PLAID_ENV,
});

export async function POST(request) {
  try {
    const { public_token } = await request.json();
    debugger
    const response = await plaidClient.exchangePublicToken(public_token);

    return new Response(
      JSON.stringify({
        access_token: response.access_token,
        item_id: response.item_id,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return new Response('Error exchanging public token', { status: 500 });
  }
}
