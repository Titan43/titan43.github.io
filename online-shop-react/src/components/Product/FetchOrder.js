import { ORDER_LINK } from "../constants";

export const fetchOrder = async (orderId, cookies, setOrder, handleMessage) => {
    try {
      const response = await fetch(`${ORDER_LINK}/${orderId}`, {
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

      const data = await response.json();
      setOrder(data);
    } catch (error) {
      handleMessage(error.message, 'error');
    }
  }