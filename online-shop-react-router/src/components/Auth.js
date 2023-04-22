import { AUTH_LINK } from './constants';

export const handleSubmit = async (username, password, setCookie, navigate, previousSectionName) => {
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
      navigate(previousSectionName);
    } else return response.text().then((error) => {
      throw new Error(error);
    });
  } catch (error) {
    console.error(error);
  }
};