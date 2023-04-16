import '../stylesheets/headers.css';
import '../stylesheets/button.css'

function Navbar(props) {
  const handleSectionChange= (event) => {
    if(props.sectionName!=="Login" && props.sectionName!=="Register"){
      props.setPreviousSectionName(props.sectionName);
    }
    const newSectionName = event.target.textContent;
    if((newSectionName === "Shopping Cart" 
      || newSectionName === "Account") 
      && !props.isLoggedIn){
      props.setPreviousSectionName(newSectionName);
      props.onSectionChange("Login");
    }
    else{
      props.onSectionChange(newSectionName);
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
                {props.sectionName!=="Login" && props.sectionName!=="Register" ?
				    (<li className = "auth-buttons">
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
				    </li>):<></>
                }
			</ul>
		</nav>
    </div>
  );
}

export default Navbar;