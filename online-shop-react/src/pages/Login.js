import '../stylesheets/headers.css';
import '../stylesheets/button.css';
import '../stylesheets/form.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser } from '../components/Auth';

const Login = (props) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password, props.setCookie, navigate, 
      props.handleMessage);
  };
  const onRegister = () => {
    navigate('/register');
  }

  useEffect(()=>{
    props.removeCookie('token');
    props.setUserId(null);
		props.setSectionName('Login');
	}, [props]);

  return (
    <div className='Login'>
        <form onSubmit={onSubmit}>
			    <label htmlFor="username">Username:</label>
		    	<input type="text"
            value={username} onChange={(event) => setUsername(event.target.value)}
            required/>
			    <label htmlFor="password">Password:</label>
			    <input type="password"
            value={password} onChange={(event) => setPassword(event.target.value)} 
            required/>
			    <button type="submit" className="btn">Sign in</button>
			    <button className="btn" onClick={onRegister}>Register</button>
        </form>
     </div>
  );
}

export default Login;