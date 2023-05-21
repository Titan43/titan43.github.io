import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from '../../Product/ProductItem';

describe('ProductItem', () => {
  const mockItem = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 9.99,
    quantity: 10,
    image: 'mockImage',
  };

  const mockUserId = 123;
  const mockRole = 'VENDOR';

  const mockHandleChangeQuantityForm = jest.fn();
  const mockHandleShowOrderProduct = jest.fn();

  beforeEach(() => {
    render(
      <ProductItem
        item={mockItem}
        userId={mockUserId}
        role={mockRole}
        handleChangeQuantityForm={mockHandleChangeQuantityForm}
        handleShowOrderProduct={mockHandleShowOrderProduct}
      />
    );
  });

  test('renders product details correctly', () => {
    const productName = screen.getByText(mockItem.name);
    const productDescription = screen.getByText("Description: "+mockItem.description);
    const productPrice = screen.getByText(`Price: ${mockItem.price}`);
    const productQuantity = screen.getByText(`Available: ${mockItem.quantity}`);

    expect(productName).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
  });

  test('calls handleShowOrderProduct when "Add to Cart" button is clicked', () => {
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(mockHandleShowOrderProduct).toHaveBeenCalledTimes(1);
    expect(mockHandleShowOrderProduct).toHaveBeenCalledWith(
      mockItem.id,
      mockItem.quantity,
      mockItem.name
    );
  });
});
