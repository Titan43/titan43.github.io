import { ORDER_LINK} from '../constants';

export const RemoveCartItem = async (cookies, productId, handleMessage) => {
  try {
    const response = await 
    fetch(`${ORDER_LINK}/removeOrdered/${productId}`, {
        method: 'DELETE',
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
      handleMessage(data);
    }
  }
  catch (error) {
    handleMessage(error.message, 'error');
  }
};