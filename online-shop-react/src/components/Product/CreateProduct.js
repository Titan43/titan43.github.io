import { PRODUCT_LINK } from "../constants";

export const CreateProduct = (formData, cookies,
     handleMessage, toggleEmpty) =>{
    console.log(formData.image);
    fetch(PRODUCT_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.token}`,
    },
    body: JSON.stringify(formData),
  })
      .then((response) => {
        if (response.ok) {
          toggleEmpty();
          return response.text();
        } else {
          return response.text().then((error) => {
            throw new Error(error);
          });
        }
      })
      .then((out) => {
        handleMessage(out);
      })
      .catch((error) => {
        handleMessage(error.message, 'error');
    });
}