import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../../pages/404';

describe('NotFound', () => {
  test('renders the NotFound component with the correct content', () => {
    const setSectionName = jest.fn();

    render(<NotFound setSectionName={setSectionName} />);

    expect(setSectionName).toHaveBeenCalledWith('Not Found');

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
