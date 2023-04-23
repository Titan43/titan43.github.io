import '../stylesheets/headers.css';
import '../stylesheets/button.css';
import '../stylesheets/form.css';
import { useNavigate } from 'react-router-dom';
import { USER_LINK } from './constants';
import { handleSubmit } from './Auth';
import { useState } from 'react';

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
  props.setSectionName('Register');

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
		  handleSubmit(formData.username, formData.password, props.setCookie, navigate, props.previousSectionName);
		})
		.catch((error) => {
		  console.error(error.message);
		});
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
