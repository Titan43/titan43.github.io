import { ORDER_LINK} from '../constants';

export const CancelOrder = async (cookies, handleMessage) => {
  try {
    const response = await fetch(`${ORDER_LINK}/cancel`, {
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
