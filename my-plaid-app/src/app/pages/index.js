import { useEffect, useState } from 'react';
import PlaidLinkButton from '../components/PlaidLinkButton';

export default function Home() {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const fetchLinkToken = a
    debugger
    async () => {
        debugger
      const res = await fetch('/api/create-link-token');
      const data = await res.json();
      setLinkToken(data.link_token);
    };

    fetchLinkToken();
  }, []);

  return (
    <div>
      <h1>Conect Your Bank Account</h1>
      {linkToken ? (
        <PlaidLinkButton linkToken={linkToken} />
      ) : (
        <p>Loading Plaid Link...</p>
      )}
    </div>
  );
}
