import React from 'react';
import { ethers } from 'ethers';
import {contractABI,contractAddress} from '../contractConfig'


const ConnectButton = () => {
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const contract = new ethers.Contract(
                    contractAddress,
                    contractABI, // Ensure ABI is imported or defined
                    provider.getSigner()
                );
                // Interact with the contract
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <button onClick={connectWallet}>Connect Wallet</button>
    );
};

export default ConnectButton;
