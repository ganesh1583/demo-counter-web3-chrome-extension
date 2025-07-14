import { ethers } from 'ethers';
const apiUrl = import.meta.env.VITE_ALCHEMY_API_URL;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;

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
<<<<<<< HEAD
  // if (!window.ethereum) {
  //   alert("MetaMask not found");
  //   return;
  // }
  // console.log("This is it : ",window.ethereum);
  // const provider = new ethers.BrowserProvider(window.ethereum);
  // const signer = await provider.getSigner();
  // contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const provider = new ethers.JsonRpcProvider(apiUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const count = await contract.getCount();
  console.log("connected");
  const contractWithSign = contract.connect(wallet);
  // getCurrentCount();
  return {count, contract, contractWithSign};
=======
  if (!window.ethereum) {
    alert("MetaMask not found, and u are here");
    return;
  }
  console.log("This is it : ",window.ethereum);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  return contract;
>>>>>>> 1d5401a (.)
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