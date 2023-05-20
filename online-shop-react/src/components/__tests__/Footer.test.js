import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('renders the footer text', () => {
    const { getByText } = render(<Footer />);
    const footerText = getByText('© 2023 Online Shop');
    expect(footerText).toBeInTheDocument();
  });
});
