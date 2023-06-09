import '../stylesheets/headers.css';
import '../stylesheets/button.css';
import '../stylesheets/form.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserCreate } from '../components/User/UserCreate';
import { loginUser } from '../components/User/Auth';

const Register = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    username: '',
    phoneNumber: '',
    email: '',
    dob: '',
    password: '',
  });

  useEffect(()=>{
    props.removeCookie('token');
		props.setSectionName('Register');
    props.setUserId(null);
	}, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLogin = () =>{
	navigate('/login')
  }
  const onRegister = (event) => {
	event.preventDefault();
  UserCreate(formData, loginUser, props.setCookie,
    props.setIsLoggedIn, props.previousSectionURL, navigate, props.handleMessage);
  };
  return (
    <div className='Register'>
      <form onSubmit={onRegister}>
        <label htmlFor="firstname">Firstname:</label>
        <input
          type="text"
          id="firstname"
          name="fname"
          value={formData.fname}
          onChange={handleInputChange}
        />
        <label htmlFor="lastname">Lastname:</label>
        <input
          type="text"
          id="lastname"
          name="sname"
          value={formData.sname}
          onChange={handleInputChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="phoneNumber">Phone number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="date-input">Date of birth:</label>
        <input
          type="date"
          id="date-input"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn">
          Register
        </button>
        <button className="btn" onClick={onLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
