import '../stylesheets/headers.css';
import '../stylesheets/button.css';
import '../stylesheets/form.css'

function Login(props) {
  return (
    <div className='Login'>
        <form>
			<label htmlFor="username">Username:</label>
			<input type="text" id="username" name="username" required/>
			<label htmlFor="password">Password:</label>
			<input type="password" id="password" name="password" required/>
			<button type="submit" className="btn">Sign in</button>
			<button className="btn" onClick={()=>props.onSectionChange('Register')}>Register</button>
        </form>
     </div>
  );
}

export default Login;