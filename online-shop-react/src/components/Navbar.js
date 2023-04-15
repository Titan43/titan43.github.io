import '../stylesheets/headers.css';
import '../stylesheets/button.css'
import { useState } from 'react';

function Navbar(props) {
  const handleSectionChange= (event) => {
    const newSectionName = event.target.textContent;
    props.onSectionChange(newSectionName);
  };

  const token = props.token;

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="Header">
		<nav>
			<ul>
				<li><button className="btn" onClick={handleSectionChange}>Home</button></li>
				<li><button className="btn" onClick={handleSectionChange}>Shopping Cart</button></li>
				<li><button className="btn" onClick={handleSectionChange}>About</button></li>
				<li><button className="btn" onClick={handleSectionChange}>Account</button></li>
				<li className = "auth-buttons">
                    {isLoggedIn ?(
					    	<button className="btn" id="logout-btn" onClick={()=>{
                                props.removeCookie('token');
                                setIsLoggedIn(false);
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