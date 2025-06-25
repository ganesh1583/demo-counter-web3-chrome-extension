import React from 'react';
import { useEffect, useState } from 'react';
import { connectContract, getCurrentCount, incrementCounter2 } from './blockchain';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCount() {
      await connectContract();
      const current = await getCurrentCount();
      setCount(Number(current));
    }

    loadCount();
  }, []);

  const handleIncrement = async () => {
    setLoading(true);
    try {
      await incrementCounter2();
      const updated = await getCurrentCount();
      setCount(Number(updated));
    } catch (err) {
      console.error("Transaction failed:", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', minWidth: '200px' }}>
      <h2>🔢 Counter</h2>
      <p>Current Count: <strong>{count}</strong></p>
      <button
        onClick={handleIncrement}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '14px',
          cursor: 'pointer',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {loading ? 'Incrementing...' : 'Increment'}
      </button>
    </div>
  );
}

export default App;
