import axios from 'axios';
import { msalInstance } from './msalConfig';

async function getAccessToken() {
  const account = msalInstance.getAllAccounts()[0];
  if (account) {
    const tokenResponse = await msalInstance.acquireTokenSilent({
      account: account,
      scopes: ["User.Read"]
    });
    return tokenResponse.accessToken;
  }
  throw new Error("No account found or unable to acquire token.");
}

export async function fetchData() {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get('http://127.0.0.1:8000/api/secure-data/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
