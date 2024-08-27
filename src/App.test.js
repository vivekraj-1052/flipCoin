// src/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CoinFlip component and welcome message', () => {
  render(<App />);

  // Check for the welcome message
  const welcomeMessage = screen.getByText((/Welcome,/i));
  expect(welcomeMessage).toBeInTheDocument();

  // Check for elements within the CoinFlip component
  const betInput = screen.getByPlaceholderText('Enter bet amount in ETH');
  expect(betInput).toBeInTheDocument();

  const headsButton = screen.getByText('Heads');
  const tailsButton = screen.getByText('Tails');
  expect(headsButton).toBeInTheDocument();
  expect(tailsButton).toBeInTheDocument();
});
