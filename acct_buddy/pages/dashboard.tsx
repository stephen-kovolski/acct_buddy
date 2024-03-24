import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const sendMessage = async () => {
    try {
      const content = 'Im writing a paper on Napoleon. Can you help me with that?'; 
      const res = await axios.post('http://localhost:3001/message', { content });

      console.log(res);
      

      if (!res.data || !res.data.message) {
        throw new Error('Invalid response format');
      }

      setResponse(res.data.message);
      console.log('******Response:', res);
      console.log('******Response:', res.data.message);
      

      setError('');
    } catch (error) {
      console.error('Error:', (error as Error).message);
      setError('An error occurred while processing your request.');
    }

    
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sendMessage}>
        Send Message
      </button>
      {error && <div className="text-red-500 mt-4">Error: {error}</div>}
      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Response:</h2>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
}
