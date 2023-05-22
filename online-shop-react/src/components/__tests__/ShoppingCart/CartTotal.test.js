import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CartTotal from '../../ShoppingCart/CartTotal';

describe('CartTotal', () => {
  const mockTotal = 100.0;
  const mockHandleConfirm = jest.fn();
  const mockHandleCancel = jest.fn();

  afterEach(() => {
    mockHandleConfirm.mockClear();
    mockHandleCancel.mockClear();
  });

  it('renders the total amount and buttons', () => {
    const { getByText, getByRole } = render(
      <CartTotal total={mockTotal} handleConfirm={mockHandleConfirm} handleCancel={mockHandleCancel} />
    );

    const totalElement = getByText(`Total: ${mockTotal}`);
    expect(totalElement).toBeInTheDocument();

    const orderButton = getByRole('button', { name: 'Order' });
    expect(orderButton).toBeInTheDocument();

    const cancelButton = getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();
  });

  it('calls handleConfirm when the order button is clicked', () => {
    const { getByRole } = render(
      <CartTotal total={mockTotal} handleConfirm={mockHandleConfirm} handleCancel={mockHandleCancel} />
    );

    const orderButton = getByRole('button', { name: 'Order' });
    fireEvent.click(orderButton);

    expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls handleCancel when the cancel button is clicked', () => {
    const { getByRole } = render(
      <CartTotal total={mockTotal} handleConfirm={mockHandleConfirm} handleCancel={mockHandleCancel} />
    );

    const cancelButton = getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });
});
