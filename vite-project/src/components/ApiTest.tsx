import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [backendResponse, setBackendResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make a GET request to the backend
    const testBackendConnection = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/test-connection');  // Replace with your API endpoint
        setBackendResponse(response.data.message);  // Adjust based on your backend's response structure
      } catch (err) {
        setError('Failed to connect to the backend');
        console.error(err);
      }
    };

    testBackendConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Backend Connection Test</h1>
      {backendResponse ? (
        <div className="text-green-500">Success: {backendResponse}</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ApiTest;
