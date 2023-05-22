import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CartListing from '../../ShoppingCart/CartListing';
import { RemoveCartItem } from '../../ShoppingCart/RemoveCartItem';
import { CancelOrder } from '../../ShoppingCart/CancelOrder';
import { ConfirmOrder } from '../../ShoppingCart/ConfirmOrder';

jest.mock('../../ShoppingCart/RemoveCartItem', () => ({
    RemoveCartItem: jest.fn(),
  }));
  
  jest.mock('../../ShoppingCart/CancelOrder', () => ({
    CancelOrder: jest.fn(),
  }));
  
  jest.mock('../../ShoppingCart/ConfirmOrder', () => ({
    ConfirmOrder: jest.fn(),
  }));

  describe('CartListing', () => {
    const mockCartData = {
      ordered_products: [
        {
          productId: '1',
          productName: 'Product 1',
          quantity: 2,
          totalCost: 50.0,
          image: 'base64image',
        },
      ],
      total_price: 100.0,
    };
  
    const mockCookies = { token: 'abc123' };
    const mockHandleMessage = jest.fn();
    const mockSetCartData = jest.fn();
    const mockValidateToken = jest.fn().mockReturnValue(true);
    const mockNavigate = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders CartItem and CartTotal components when not loading', () => {
      const { getByText, getByTestId } = render(
        <CartListing
          isLoading={false}
          cartData={mockCartData}
          cookies={mockCookies}
          handleMessage={mockHandleMessage}
          setCartData={mockSetCartData}
          validateToken={mockValidateToken}
          navigate={mockNavigate}
        />
      );
  
      expect(getByTestId('cart-items')).toBeInTheDocument();
  
      const productItem = getByText('Product 1');
      expect(productItem).toBeInTheDocument();
  
      const removeButton = getByText('Remove');
      fireEvent.click(removeButton);
  
      expect(RemoveCartItem).toHaveBeenCalledTimes(0);
  
      const cancelButton = getByText('Cancel');
      fireEvent.click(cancelButton);
  
      expect(CancelOrder).toHaveBeenCalledTimes(0);
  
      const confirmButton = getByText('Order');
      fireEvent.click(confirmButton);
  
      expect(ConfirmOrder).toHaveBeenCalledTimes(0);
    });
  
    it('does not render CartItem and CartTotal components when loading', () => {
      const { queryByTestId } = render(
        <CartListing
          isLoading={true}
          cartData={mockCartData}
          cookies={mockCookies}
          handleMessage={mockHandleMessage}
          setCartData={mockSetCartData}
          validateToken={mockValidateToken}
          navigate={mockNavigate}
        />
      );
  
      expect(queryByTestId('cart-items')).toBeNull();
    });
  });