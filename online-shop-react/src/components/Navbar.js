import '../stylesheets/headers.css';
import '../stylesheets/button.css'

function Navbar(props) {
  const handleSectionChange= (event) => {
    const newSectionName = event.target.textContent;
    props.onSectionChange(newSectionName);

    if(newSectionName === 'Login'){
        props.setCookie('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTY4MTU4MTc0NCwiaWF0IjoxNjgxNTYwMTQ0fQ.Mw0GQScd-at6mLIvZyft2zmGbRAoEDQ4HjUtJMLpdoc');
    }
  };

  return (
    <div className="Navbar">
		<nav>
			<ul>
				<li><button className="btn" onClick={handleSectionChange}>Home</button></li>
				<li><button className="btn" onClick={handleSectionChange}>Shopping Cart</button></li>
				<li><button className="btn" onClick={handleSectionChange}>About</button></li>
				<li><button className="btn" onClick={handleSectionChange}>Account</button></li>
				<li className = "auth-buttons">
                    {props.isLoggedIn ?(
					    	<button className="btn" id="logout-btn" onClick={()=>{
                                props.removeCookie('token');
                                props.onSectionChange('Login')
                                }
                            }>Logout</button>
                        ) : (
                        <>
                            <button className="btn" id="login-btn" onClick={handleSectionChange}>Login</button>
					        <button className="btn" id="register-btn" onClick={handleSectionChange}>Register</button>
                        </>
                    )}
				</li>
			</ul>
		</nav>
    </div>
  );
}

export default Navbar;