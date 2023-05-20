import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar', () => {
  test('renders navigation links and buttons correctly', () => {
    const sectionName = 'test';
    const isLoggedIn = false;

    render(
      <BrowserRouter>
        <Navbar sectionName={sectionName} isLoggedIn={isLoggedIn} />
      </BrowserRouter>
    );

    const shopLink = screen.getByText('Shop now');
    const cartLink = screen.getByText('Shopping Cart');
    const homeLink = screen.getByText('Home');
    const accountLink = screen.getByText('Account');
    const loginButton = screen.getByText('Login');
    const registerButton = screen.getByText('Register');

    expect(shopLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(accountLink).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('toggles menu visibility when the menu button is clicked', () => {
    const sectionName = 'Home';
    const isLoggedIn = false;

    render(
      <BrowserRouter>
        <Navbar sectionName={sectionName} isLoggedIn={isLoggedIn} />
      </BrowserRouter>
    );

    const menuButton = screen.getByText('Menu');

    fireEvent.click(menuButton);

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(sidebar).toHaveClass("navmenu");
  });
});
