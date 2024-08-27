import React, { useState } from 'react';
import { ethers } from 'ethers';
import useWallet from '../hooks/useWallet';
import { contractAddress, contractABI } from '../contractConfig'; 

const CoinFlip = () => {
    const [bet, setBet] = useState('');
    const [result, setResult] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState('');
    const account = useWallet();

    const handleFlip = async (guess) => {
        if (!bet || isNaN(bet)) {
            alert('Please enter a valid bet amount in ETH');
            return;
        }

        try {
            setTransactionStatus('Processing...');
            
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Convert bet amount from ETH to Wei
            const betAmountInWei = ethers.parseEther(bet);

            const tx = await contract.flipCoin(guess, { value: betAmountInWei });
            await tx.wait();
            
            // Fetch the result from the contract if applicable
            // const outcome = await contract.flipCoin(guess); // This might be unnecessary
            setResult('Coin flipped successfully!');
            setTransactionStatus('Transaction complete');

        } catch (error) {
            console.error(error);
            setResult('Transaction failed');
            setTransactionStatus('');
        }
    };

    return (
        <div>
            <h2>Welcome, {account ? account : 'please connect your wallet'}</h2>
            <input
                type="text"
                value={bet}
                onChange={(e) => setBet(e.target.value)}
                placeholder="Enter bet amount in ETH"
            />
            <div>
                <button onClick={() => handleFlip(true)}>Heads</button>
                <button onClick={() => handleFlip(false)}>Tails</button>
            </div>
            {transactionStatus && <p>{transactionStatus}</p>}
            {result && <p>{result}</p>}
        </div>
    );
};

export default CoinFlip;
