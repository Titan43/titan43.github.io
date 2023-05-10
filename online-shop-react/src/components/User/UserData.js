import { USER_LINK } from '../constants';

export const UserData = async (cookies, setUser, handleMessage, username) => {
  try {
    const response = await fetch(
      `${USER_LINK}${username? '?username='+username : ''}` , {
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
    else{
      const data = await response.json();
      data.password = null;
      setUser(data);
    }
  }
  catch (error) {
    handleMessage(error.message, 'error');
  }
};
