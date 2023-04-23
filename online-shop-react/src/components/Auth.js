import { AUTH_LINK } from './constants';

export const loginUser = async (username, password, setCookie, navigate, handleMessage) => {
  try {
    const response = await fetch(AUTH_LINK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      const userToken = await response.json();
      setCookie('token', userToken.token);
      navigate('/');
      handleMessage('Successfully logged in(CODE 200)')
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    handleMessage(error.message, 'error');
    console.error(error.message);
  }  
};