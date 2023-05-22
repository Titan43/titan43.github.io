import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
import '../../stylesheets/form.css';
import { useState } from 'react';
import { UserUpdate } from './UserUpdate';

function UpdateUserForm(props) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    dob: '',
    password: '',
    fname: '',
    sname: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await UserUpdate(props.username, formData, 
      props.cookies, props.handleMessage);
    props.handleUserObtain();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className='popup'>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="fname"
        value={formData.fname}
        onChange={handleInputChange}
      />

      <label htmlFor="surname">Surname:</label>
      <input
        type="text"
        id="surname"
        name="sname"
        value={formData.sname}
        onChange={handleInputChange}
      />
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />

      <label htmlFor="dob">Date of Birth:</label>
      <input
        type="date"
        id="dob"
        name="dob"
        value={formData.dob}
        onChange={handleInputChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <button type="submit" className="btn">
        Update User
      </button>

      <button
        type="button"
        className="btn remove"
        onClick={props.handleUserUpdateForm}
      >
        Cancel
      </button>
    </form>
  );
}

export default UpdateUserForm;