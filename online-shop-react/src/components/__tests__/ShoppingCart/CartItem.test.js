import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CartItem from '../../ShoppingCart/CartItem';

describe('CartItem', () => {
  const mockItem = {
    productName: 'Product 1',
    image: 'base64image',
    quantity: 2,
    totalCost: 100.0,
    productId: '1',
  };

  it('renders cart item with correct details', () => {
    const handleRemoveItem = jest.fn();

    const { getByText, getByAltText, getByTestId } = render(
      <CartItem item={mockItem} handleRemoveItem={handleRemoveItem} />
    );

    expect(getByText(mockItem.productName)).toBeInTheDocument();
    expect(getByAltText('Something went wrong')).toBeInTheDocument();
    expect(getByText(`Quantity: ${mockItem.quantity}`)).toBeInTheDocument();
    expect(getByText(`Total cost: ${mockItem.totalCost}`)).toBeInTheDocument();
    expect(getByText('Remove')).toBeInTheDocument();
  });

  it('calls handleRemoveItem when remove button is clicked', () => {
    const handleRemoveItem = jest.fn();

    const { getByText } = render(
      <CartItem item={mockItem} handleRemoveItem={handleRemoveItem} />
    );

    const removeButton = getByText('Remove');
    fireEvent.click(removeButton);

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(mockItem.productId);
  });
});
