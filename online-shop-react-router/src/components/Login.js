import '../stylesheets/headers.css';
import '../stylesheets/button.css';
import '../stylesheets/form.css'
import {AUTH_LINK} from './constants'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  props.setSectionName('Login');
  props.removeCookie('token');

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        props.setCookie('token', userToken.token);
        navigate(props.previousSectionName);
      } else return response.text().then((error) => {
        throw new Error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Login'>
        <form onSubmit={handleSubmit}>
			    <label htmlFor="username">Username:</label>
		    	<input type="text"
            value={username} onChange={(event) => setUsername(event.target.value)}
            required/>
			    <label htmlFor="password">Password:</label>
			    <input type="password"
            value={password} onChange={(event) => setPassword(event.target.value)} 
            required/>
			    <button type="submit" className="btn">Sign in</button>
			    <button className="btn">Register</button>
        </form>
     </div>
  );
}

export default Login;