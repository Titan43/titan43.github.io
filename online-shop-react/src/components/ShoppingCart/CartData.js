import { ORDER_LINK} from '../constants';

export const CartData = async (cookies, setCart, setIsLoading, setCartLoaded, handleMessage) => {
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
      throw new Error(error);
    }
    else{
      const data = await response.json();
      setCart(data);
      setIsLoading(false);
      setCartLoaded(true);
    }
  }
  catch (error) {
    setIsLoading(false);
    setCartLoaded(true);
    handleMessage(error.message, 'error');
  }
};
