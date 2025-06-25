import { ethers } from 'ethers';

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

let contract;

export async function connectContract() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }
  console.log("This is it : ",window.ethereum);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  return contract;
}




export async function getCurrentCount() {
  if (!contract) await connectContract();
  const count = await contract.getCount();
  return count;
}

export async function incrementCounter2() {
  if (!contract) await connectContract();
  const tx = await contract.incrementCounter();
  await tx.wait();
}