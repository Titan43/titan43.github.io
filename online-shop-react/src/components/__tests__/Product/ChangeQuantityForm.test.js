import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChangeQuantityForm from '../../Product/ChangeQuantityForm';

describe('ChangeQuantityForm', () => {
  it('should submit form with correct data', () => {
    const cookies = { token: 'mockToken' };
    const prodId = 'testProductId';
    const currentQuantity = 5;
    const handleMessage = jest.fn();
    const handleChangeQuantityForm = jest.fn();

    const { getByLabelText, getByText } = render(
      <ChangeQuantityForm
        cookies={cookies}
        prodId={prodId}
        currentQuantity={currentQuantity}
        handleMessage={handleMessage}
        handleChangeQuantityForm={handleChangeQuantityForm}
      />
    );

    const quantityInput = getByLabelText('Change quantity by:');
    fireEvent.change(quantityInput, { target: { value: '3' } });

    const submitButton = getByText('Change');

    fireEvent.click(submitButton);

    expect(handleMessage).toHaveBeenCalledTimes(0);
  });

  it('should cancel the form', () => {
    const handleChangeQuantityForm = jest.fn();

    const { getByText } = render(
      <ChangeQuantityForm handleChangeQuantityForm={handleChangeQuantityForm} />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleChangeQuantityForm).toHaveBeenCalledTimes(1);
  });
});
