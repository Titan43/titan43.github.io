import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders the footer with the correct text', () => {
    render(<Footer />);
    const footerText = screen.getByText('© 2023 Online Shop');
    expect(footerText).toBeInTheDocument();
  });
});
