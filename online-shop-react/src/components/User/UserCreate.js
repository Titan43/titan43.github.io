import { USER_LINK } from "../constants";

export const UserCreate = (formData, loginUser, setCookie,
     navigate, handleMessage) =>{
    fetch(`${USER_LINK}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.text().then((error) => {
            throw new Error(error);
          });
        }
      })
      .then((out) => {
        loginUser(formData.username, formData.password, setCookie, 
          navigate, handleMessage);
        handleMessage(out);
      })
      .catch((error) => {
        handleMessage(error.message, 'error');
    });
}