import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrderElement from '../../Product/OrderElement';

describe('OrderElement', () => {
  it('should render order details correctly', () => {
    const order = {
      id: 123,
      username: 'john_doe',
      totalCost: 50,
      date: '2023-05-20',
      confirmed: true,
    };
    const handleViewOrder = jest.fn();

    const { getByText } = render(
      <OrderElement order={order} handleViewOrder={handleViewOrder} />
    );

    const orderId = getByText('Order ID: 123');
    const username = getByText('Username: john_doe');
    const totalCost = getByText('Total Cost: 50');
    const orderDate = getByText('Order Date: 2023-05-20');
    const confirmed = getByText('Confirmed: true');
    const viewOrderButton = getByText('View order');

    expect(orderId).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(totalCost).toBeInTheDocument();
    expect(orderDate).toBeInTheDocument();
    expect(confirmed).toBeInTheDocument();
    expect(viewOrderButton).toBeInTheDocument();

    fireEvent.click(viewOrderButton);

    expect(handleViewOrder).toHaveBeenCalledTimes(1);
    expect(handleViewOrder).toHaveBeenCalledWith(123);
  });
});
