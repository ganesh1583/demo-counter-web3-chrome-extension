import React from 'react';
import { useEffect, useState } from 'react';
import { connectContract, incrementCounter2 } from './blockchain';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const [contractWithSign, setContractWithSign] = useState(null);

  useEffect(() => {
    async function loadCount() {
      const getData = await connectContract();
      setContract(getData.contract);
      setContractWithSign(getData.contractWithSign);
      // const current = await getCurrentCount();
      setCount(getData.count);
    }

    loadCount();
  }, []);

  async function getCurrentCount() {
    if (!contract) await connectContract();
    const count = await contract.getCount();
    return count;
  }
  
  const handleIncrement = async () => {
    setLoading(true);
    try {
      // await incrementCounter2();
      // const updated = await getCurrentCount();
        const tx = await contractWithSign.incrementCounter();
        await tx.wait();
      setCount(getCurrentCount);
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
