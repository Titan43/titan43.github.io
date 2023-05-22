import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ShopNow from '../../../pages/ShopNow';
import { fetchProducts } from '../../Product/LoadProducts';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../Product/LoadProducts', () => ({
  fetchProducts: jest.fn(),
}));

describe('ShopNow', () => {
  let mockHandleMessage;
  let mockSetPreviousSectionURL;
  let mockSetSectionName;
  let mockValidateToken;
  let mockNavigate;
  let mockCookies;
  let mockUserId;
  let mockRole;

  beforeEach(() => {
    mockHandleMessage = jest.fn();
    mockSetPreviousSectionURL = jest.fn();
    mockSetSectionName = jest.fn();
    mockValidateToken = jest.fn();
    mockNavigate = jest.fn();
    mockCookies = {};
    mockUserId = 'testUser';
    mockRole = 'admin';
  });

  it('renders the ShopNow component', async () => {
    const mockItems = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    fetchProducts.mockImplementationOnce((_, __, setItems, ___, setLoading) => {
      setItems(mockItems);
      setLoading(false);
    });

    const { getByText, queryByTestId } = render(
    <BrowserRouter>
      <ShopNow
        handleMessage={mockHandleMessage}
        setPreviousSectionURL={mockSetPreviousSectionURL}
        setSectionName={mockSetSectionName}
        validateToken={mockValidateToken}
        navigate={mockNavigate}
        cookies={mockCookies}
        userId={mockUserId}
        role={mockRole}
      />
      </BrowserRouter>
    );

    await waitFor(() => expect(queryByTestId('spinner')).not.toBeInTheDocument());

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
  });

  it('displays no products message', async () => {
    fetchProducts.mockImplementationOnce((_, __, setItems, ___, setLoading) => {
      setItems([]);
      setLoading(false);
    });

    const { getByText, queryByTestId } = render(
      <BrowserRouter>
      <ShopNow
        handleMessage={mockHandleMessage}
        setPreviousSectionURL={mockSetPreviousSectionURL}
        setSectionName={mockSetSectionName}
        validateToken={mockValidateToken}
        navigate={mockNavigate}
        cookies={mockCookies}
        userId={mockUserId}
        role={mockRole}
      />
      </BrowserRouter>
    );

    await waitFor(() => expect(queryByTestId('spinner')).not.toBeInTheDocument());

    expect(getByText('No products to display')).toBeInTheDocument();
  });

});
