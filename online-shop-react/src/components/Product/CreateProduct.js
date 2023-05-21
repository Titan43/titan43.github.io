import { PRODUCT_LINK } from "../constants";

export const CreateProduct = async (formData, cookies,
     handleMessage, toggleEmpty) =>{
    try{
      const response = await fetch(PRODUCT_LINK, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const message = await response.text();
        toggleEmpty();
        handleMessage(message);
      } else {
          const error = await response.text()
          throw new Error(error);
        }
    }
    catch(error){
        handleMessage(error.message, 'error');
    }
}