import { PRODUCT_LINK} from '../constants';

export const changeQuantityBy = async (cookies, productId, quantity, handleMessage) => {
  try {
    const payload = JSON.stringify({changeQuantityBy: quantity});
    const response = await 
    fetch(`${PRODUCT_LINK}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`,
      },
      body: payload,
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