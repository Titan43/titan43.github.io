import React from 'react';
import { render, screen } from '@testing-library/react';
import UserBlock from '../../User/UserView';

describe('UserBlock', () => {
  test('renders the UserBlock component with the correct user information', () => {
    const user = {
      role: 'Admin',
      fname: 'John',
      sname: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      dob: '1990-01-01',
    };

    render(<UserBlock user={user} />);

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: johndoe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone number: 1234567890')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth: 1990-01-01')).toBeInTheDocument();
  });
});
