import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xdA3E6CbEE2Cc8139b5baA58a09AC56c36cd001e4";

const CONTRACT_ABI = [
    {
      "inputs": [],
      "name": "getCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "incrementCounter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]


(async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (typeof window.ethereum === "undefined") {
    console.warn("MetaMask not detected in content script.");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  try {
    const count = await contract.getCount();
    console.log("Smart contract count:", count.toString());

    const input = document.querySelector("input[type='text'], input[type='email']");
    if (input) {
      input.value = `Count: ${count}`;
    }

    // Call incrementCounter() — optional
    // const tx = await contract.incrementCounter();
    // await tx.wait();
    // console.log("Counter incremented");
  } catch (err) {
    console.error("Smart contract interaction failed:", err);
  }
})();
