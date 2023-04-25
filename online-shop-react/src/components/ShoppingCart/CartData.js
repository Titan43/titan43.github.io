import { ORDER_LINK} from '../constants';

export const CartData = async (cookies, setCart, setCartEmpty, handleMessage) => {
  try {
    const response = await fetch(`${ORDER_LINK}/myOrder`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`,
      },
    });
    if (!response.ok) {
      const error = await response.text();
      setCartEmpty(true);
      throw new Error(error);
    }
    else{
      const data = await response.json();
      setCart(data);
    }
  }
  catch (error) {
    handleMessage(error.message, 'error');
  }
};
