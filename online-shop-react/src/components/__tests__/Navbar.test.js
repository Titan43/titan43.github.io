import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
test('Navbar renders correctly', () => {
    render(
      <BrowserRouter>
        <Navbar sectionName="Test Section" isLoggedIn={false} />
      </BrowserRouter>
    );
  
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop now' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shopping Cart' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();
});
  