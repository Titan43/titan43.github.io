import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddProductForm from '../../Product/AddProductForm';

describe('AddProductForm', () => {
  it('should submit form with correct data', () => {
    const cookies = { token: 'mockToken' };
    const handleMessage = jest.fn();
    const toggleEmpty = jest.fn();

    const { getByLabelText, getByText } = render(
      <AddProductForm
        cookies={cookies}
        handleMessage={handleMessage}
        toggleEmpty={toggleEmpty}
      />
    );

    const productNameInput = getByLabelText('Product Name:');
    fireEvent.change(productNameInput, { target: { value: 'Test Product' } });

    const productPriceInput = getByLabelText('Product Price:');
    fireEvent.change(productPriceInput, { target: { value: '9.99' } });

    const productQuantityInput = getByLabelText('Product Quantity:');
    fireEvent.change(productQuantityInput, { target: { value: '10' } });

    const productDescriptionInput = getByLabelText('Product Description:');
    fireEvent.change(productDescriptionInput, {
      target: { value: 'Test description' },
    });

    const productPictureInput = getByLabelText("Product Image:");
    fireEvent.change(productPictureInput, {  target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})],
      }});

    const submitButton = getByText('Add Product');

    fireEvent.click(submitButton);

    expect(handleMessage).toHaveBeenCalledTimes(0);
    expect(toggleEmpty).toHaveBeenCalledTimes(0);
  });

  it('should cancel the form', () => {
    const handleAddProductForm = jest.fn();

    const { getByText } = render(
      <AddProductForm handleAddProductForm={handleAddProductForm} />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleAddProductForm).toHaveBeenCalledTimes(1);
  });
});
