// src/setupTests.js

import '@testing-library/jest-dom';

// Mocking the global window object with ethereum provider
global.window = Object.create(window);
global.window.ethereum = {
    request: jest.fn().mockResolvedValue(['0x1234567890abcdef1234567890abcdef12345678']), // Mock account address
    on: jest.fn(), // Mock the 'on' method to simulate event listeners
    send: jest.fn(), // Mock the 'send' method if used
};

// Mock ethers.js
jest.mock('ethers', () => {
    const actualEthers = jest.requireActual('ethers');
    return {
        ...actualEthers,
        ethers: {
            ...actualEthers.ethers,
            providers: {
                ...actualEthers.ethers.providers,
                Web3Provider: jest.fn().mockImplementation(() => ({
                    getSigner: jest.fn().mockReturnValue({
                        getAddress: jest.fn().mockResolvedValue('0x1234567890abcdef1234567890abcdef12345678'),
                    }),
                    // Ensure 'send' is mocked correctly if used
                    send: jest.fn(),
                })),
            },
            Contract: jest.fn().mockImplementation(() => ({
                flip: jest.fn().mockResolvedValue(true), // Mock flip method
            })),
        },
    };
});
