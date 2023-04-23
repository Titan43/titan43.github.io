import '../stylesheets/headers.css';
import '../stylesheets/button.css';
import '../stylesheets/form.css';
import { useState } from 'react';

function UpdateUserForm(props) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    dob: '',
    password: '',
    firstName: '',
    surname: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
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
        required
        value={formData.password}
        onChange={handleInputChange}
      />

      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />

      <label htmlFor="surname">Surname:</label>
      <input
        type="text"
        id="surname"
        name="surname"
        value={formData.surname}
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