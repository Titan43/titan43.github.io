import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import ShoppingCart from '../../../pages/ShoppingCart';

const setPreviousSectionURL = jest.fn();
const setSectionName = jest.fn();
const validateToken = jest.fn();
const cookies = {
  token: 'mockToken',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ShoppingCart', () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner when loading', () => {
    render(
      <ShoppingCart
        cookies={cookies}
        setPreviousSectionURL={setPreviousSectionURL}
        setSectionName={setSectionName}
        validateToken={validateToken}
        isLoggedIn={true}
        handleMessage={jest.fn()}
      />
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('calls validateToken and sets section name and previous section URL on mount', () => {
    render(
      <ShoppingCart
        cookies={cookies}
        setPreviousSectionURL={setPreviousSectionURL}
        setSectionName={setSectionName}
        validateToken={validateToken}
        isLoggedIn={true}
        handleMessage={jest.fn()}
      />
    );

    expect(validateToken).toHaveBeenCalled();
    expect(setPreviousSectionURL).toHaveBeenCalledWith('/shopping_cart');
    expect(setSectionName).toHaveBeenCalledWith('Shopping cart');
  });
});
