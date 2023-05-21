import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoadButtons from '../../Product/LoadButtons';

describe('LoadButtons', () => {
  it('should render buttons correctly', () => {
    const onPrevClick = jest.fn();
    const onNextClick = jest.fn();
    const handleAddProductForm = jest.fn();
    const isEmpty = false;

    const { getByText } = render(
      <LoadButtons
        role="VENDOR"
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        handleAddProductForm={handleAddProductForm}
        isEmpty={isEmpty}
      />
    );

    const loadPrevButton = getByText('Load previous items');
    const addProductButton = getByText('Add product');
    const loadMoreButton = getByText('Load more');

    expect(loadPrevButton).toBeInTheDocument();
    expect(addProductButton).toBeInTheDocument();
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadPrevButton);
    fireEvent.click(addProductButton);
    fireEvent.click(loadMoreButton);

    expect(onPrevClick).toHaveBeenCalledTimes(1);
    expect(handleAddProductForm).toHaveBeenCalledTimes(1);
    expect(onNextClick).toHaveBeenCalledTimes(1);
  });

  it('should not render buttons when isEmpty is true', () => {
    const onPrevClick = jest.fn();
    const onNextClick = jest.fn();
    const handleAddProductForm = jest.fn();
    const isEmpty = true;

    const { queryByText } = render(
      <LoadButtons
        role="VENDOR"
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        handleAddProductForm={handleAddProductForm}
        isEmpty={isEmpty}
      />
    );

    const loadPrevButton = queryByText('Load previous items');
    const addProductButton = queryByText('Add product');
    const loadMoreButton = queryByText('Load more');

    expect(loadPrevButton).toBeNull();
    expect(addProductButton).toBeInTheDocument();
    expect(loadMoreButton).toBeNull();
  });
});
