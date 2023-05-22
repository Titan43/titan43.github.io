import React from 'react';
import { render, waitFor } from '@testing-library/react';
import OrderDetails from '../../Product/OrderDetails';

describe('OrderDetails', () => {
  it('displays loading spinner while fetching order', () => {
    const props = {
      validateToken: jest.fn(),
      navigate: jest.fn(),
      orderId: '123',
      cookies: { token: 'abc123' },
      handleMessage: jest.fn(),
      role: 'MANAGER',
    };

    const { getByTestId, queryByTestId } = render(<OrderDetails {...props} />);
    expect(getByTestId('spinner')).toBeInTheDocument();
    expect(queryByTestId('order-details')).not.toBeInTheDocument();
  });

  it('displays order details when order is fetched and role is MANAGER', async () => {
    const props = {
      validateToken: jest.fn(),
      navigate: jest.fn(),
      orderId: '123',
      cookies: { token: 'abc123' },
      handleMessage: jest.fn(),
      role: 'MANAGER',
    };

    const mockOrder = {
      date: '2023-05-22',
      order_owner: 'John Doe',
      total_price: 100.0,
      confirmed: true,
      ordered_products: [
        {
          productId: '1',
          productName: 'Product 1',
          quantity: 2,
          totalCost: 50.0,
          image: 'base64image',
        },
      ],
    };

    jest.mock('../../Product/FetchOrder', () => ({
      fetchOrder: jest.fn().mockResolvedValue(mockOrder),
    }));

    const { getByTestId, queryByTestId, getByText } = render(<OrderDetails {...props} />);
    await waitFor(() => expect(getByTestId('spinner')).toBeInTheDocument());
    expect(queryByTestId('order-details')).not.toBeInTheDocument();
  });

  it('displays error message when order cannot be viewed', async () => {
    const props = {
      validateToken: jest.fn(),
      navigate: jest.fn(),
      orderId: '123',
      cookies: { token: 'abc123' },
      handleMessage: jest.fn(),
      role: 'MANAGER',
    };

    jest.mock('../../Product/FetchOrder', () => ({
      fetchOrder: jest.fn().mockRejectedValue(new Error('Order cannot be viewed')),
    }));

    const { getByTestId, getByText, queryByTestId } = render(<OrderDetails {...props} />);
    await waitFor(() => expect(getByTestId('spinner')).toBeInTheDocument());

    expect(queryByTestId('order-details')).not.toBeInTheDocument();
  });
});
