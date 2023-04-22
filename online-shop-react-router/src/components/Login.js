import '../stylesheets/headers.css';
import '../stylesheets/button.css';
import '../stylesheets/form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSubmit } from './Auth';

const Login = (props) => {

  props.setSectionName('Login');
  props.removeCookie('token');

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(username, password, props.setCookie, navigate, props.previousSectionName);
  };
  const onRegister = () => {
    navigate('/register');
  }

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