import '../stylesheets/headers.css';
import '../stylesheets/button.css';
import '../stylesheets/form.css';

const Register = () => {
  return (
    <div className='Login'>
		  <form>
			  <label htmlFor="firstname">Firstname:</label>
			  <input type="text" id="firstname" name="fname" />
			  <label htmlFor="lastname">Lastname:</label>
			  <input type="text" id="lastname" name="sname" />
			  <label htmlFor="username">Username:</label>
			  <input type="text" id="username" name="username" required />
			  <label htmlFor="phoneNumber">Phone number:</label>
			  <input type="text" id="phoneNumber" name="phoneNumber" required />
			  <label htmlFor="email">Email:</label>
			  <input type="email" id="email" name="email" required />
			  <label htmlFor="date-input">Date of birth:</label>
			  <input type="date" id="date-input" name="dob" required />
			  <label htmlFor="password">Password:</label>
			  <input type="password" id="password" name="password" required />
			  <button type="submit" className="btn">Register</button>
			  <button className="btn">Login</button>
      </form>
    </div>
  );
}

export default Register;
