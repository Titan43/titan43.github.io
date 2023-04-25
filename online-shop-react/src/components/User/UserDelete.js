import { USER_LINK } from '../constants';

export const UserDelete = async (username, cookies, navigate, handleMessage) => {
  try {
    const response = await fetch(USER_LINK+`?username=${username}`, {
      method: 'DELETE',
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
      const data = await response.text();
      navigate('/login');
      handleMessage(data);
    }
  }
  catch (error) {
    handleMessage(error.message, 'error');
  }
};