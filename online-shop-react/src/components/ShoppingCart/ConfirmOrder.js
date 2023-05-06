import { ORDER_LINK} from '../constants';

export const ConfirmOrder = async (cookies, setCartData, handleMessage) => {
  try {
    const response = await fetch(`${ORDER_LINK}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
        },
      });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    else{
      const data = await response.text();
      setCartData(null);
      handleMessage(data);
    }
  }
  catch (error) {
    handleMessage(error.message, 'error');
  }
};
