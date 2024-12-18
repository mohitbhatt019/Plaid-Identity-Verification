import axios from 'axios';

export async function POST(request) {
  const { access_token } = await request.json();

  const plaidRequestData = {
    client_id: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    client_user_id: `test_user_${Date.now()}`,
    template_id: process.env.PLAID_TEMPLATE_ID,
    access_token,
  };

  try {
    const response = await axios.post(
      'https://sandbox.plaid.com/identity_verification/create',
      plaidRequestData,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error) {
    console.error('Error initiating identity verification:', error);
    return new Response('Error initiating identity verification', { status: 500 });
  }
}
