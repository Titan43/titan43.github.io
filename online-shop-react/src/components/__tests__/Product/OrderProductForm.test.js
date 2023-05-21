import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrderProductForm from '../../Product/OrderProductForm';

describe('OrderProductForm', () => {
  it('should submit the form with the correct data', () => {
    const cookies = { token: 'mockToken' };
    const prodId = 123;
    const prodName = 'Test Product';
    const currentQuantity = 10;
    const handleMessage = jest.fn();
    const handleShowOrderProduct = jest.fn();

    const { getByLabelText, getByText } = render(
      <OrderProductForm
        cookies={cookies}
        prodId={prodId}
        prodName={prodName}
        currentQuantity={currentQuantity}
        handleMessage={handleMessage}
        handleShowOrderProduct={handleShowOrderProduct}
      />
    );

    const quantityInput = getByLabelText('Amount of products to order:');
    fireEvent.change(quantityInput, { target: { value: '5' } });

    const submitButton = getByText('Order');
    fireEvent.click(submitButton);

    expect(handleShowOrderProduct).toHaveBeenCalledTimes(1);
  });

  it('should cancel the form', () => {
    const handleShowOrderProduct = jest.fn();

    const { getByText } = render(
      <OrderProductForm handleShowOrderProduct={handleShowOrderProduct} />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleShowOrderProduct).toHaveBeenCalledTimes(1);
  });
});
