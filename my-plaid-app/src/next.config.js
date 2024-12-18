module.exports = {
    reactStrictMode: true,
    env: {
      PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
      PLAID_SECRET: process.env.PLAID_SECRET,
      PLAID_ENV: process.env.PLAID_ENV,
    },
  };
  