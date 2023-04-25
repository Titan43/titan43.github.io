import { USER_LINK } from '../constants';

export const UserUpdate = async (username, newwData, cookies, handleMessage) => {
  try {
    const response = await fetch(USER_LINK+`?username=${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(newwData),
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