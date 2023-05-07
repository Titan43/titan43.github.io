import { ORDER_LINK} from '../constants';

export const orderProduct = async (cookies, productId, quantity, handleMessage) => {
  try {
    const response = await 
    fetch(`${ORDER_LINK}/orderProduct/${productId}?quantity=${quantity}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`,
        },
      })
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    else{
      const data = await response.text();
      handleMessage(data);
    }
  }
  catch (error) {
    handleMessage(error.message, 'error');
  }
};