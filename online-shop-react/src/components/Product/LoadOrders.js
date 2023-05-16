import { ORDER_LINK } from "../constants";
export const fetchOrders = async (isEmptyRef, currentPage, cookies, setItems, loadPrevItems, setLoading, handleMessage) => {
    if (!isEmptyRef.current) {
      try {
        const response = await fetch(
          `${ORDER_LINK}/allOrders?page=${currentPage}&count=9`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookies.token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(await response.text());
        }
  
        const data = await response.json();
  
        if (data && data.length > 0) {
          setItems(data);
        } else {
          handleMessage("Can't load more items(CODE 404)", 'error');
  
          if (currentPage > 0) {
            loadPrevItems();
          } else {
            isEmptyRef.current = true;
          }
        }
      } catch (error) {
        handleMessage(error.message, 'error');
        isEmptyRef.current=true;
      } finally{
        setLoading(false);
      }
    }
  };
  