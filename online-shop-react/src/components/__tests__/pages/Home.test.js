import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../../pages/Home';

describe('Home', () => {
  test('renders the Home component with the correct content', () => {
    const setPreviousSectionURL = jest.fn();
    const setSectionName = jest.fn();

    render(
      <Home
        setPreviousSectionURL={setPreviousSectionURL}
        setSectionName={setSectionName}
      />
    );

    expect(setPreviousSectionURL).toHaveBeenCalledWith('/');
    expect(setSectionName).toHaveBeenCalledWith('Home');

    expect(screen.getByText('Welcome to the Online Shop')).toBeInTheDocument();
    expect(screen.getByText('Exceptional customer service')).toBeInTheDocument();
    expect(screen.getByText('Best value')).toBeInTheDocument();
    expect(screen.getByText('Stop waiting, just DO IT!')).toBeInTheDocument();
  });
});
