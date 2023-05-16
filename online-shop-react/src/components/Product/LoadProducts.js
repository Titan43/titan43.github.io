import { PRODUCT_LINK } from "../constants";
export const fetchProducts = async (isEmptyRef, currentPage, setItems, loadPrevItems, setLoading, handleMessage) => {
    if(!isEmptyRef.current)
    try {
      const response = await fetch(
        `${PRODUCT_LINK}/products?page=${currentPage}&count=9`
      );
      if (!response.ok) {
        return response.text().then((error) => {
          throw new Error(error);
        });
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setItems(data);
      } else {
        handleMessage("Can't load more items(CODE 404)", 'error');
        if(currentPage>0){
          loadPrevItems();
        }
        else{
          isEmptyRef.current = true;
        }
      }
    } catch (error) {
      handleMessage(error, 'error');
    }
    setLoading(false);
  };