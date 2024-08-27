const interactWithContract = async (contract) => {
    try {
        // Example usage: Call a contract function
        const result = await contract.someFunction();
        console.log(result);
    } catch (error) {
        console.error("Error interacting with contract:", error);
    }
};

const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                provider.getSigner()
            );

            // Call the interaction function
            interactWithContract(contract);
            
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
};
