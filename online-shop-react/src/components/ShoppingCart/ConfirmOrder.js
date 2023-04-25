import { ORDER_LINK} from '../constants';

export const ConfirmOrder = async (cookies, setConfirmed, handleMessage) => {
  try {
    const response = await fetch(`${ORDER_LINK}/confirm`, {
        method: 'GET',
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
      setConfirmed(true);
    }
  }
  catch (error) {
    handleMessage(error.message, 'error');
  }
};
