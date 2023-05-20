import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../Loading';

describe('LoadingSpinner', () => {
  test('renders the loading spinner with the correct CSS classes', () => {
    render(<LoadingSpinner />);
    const loadingBox = screen.getByTestId('loading-box');
    const spinner = screen.getByTestId('spinner');

    expect(loadingBox).toBeInTheDocument();
    expect(loadingBox).toHaveClass('item');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner');
  });
});
