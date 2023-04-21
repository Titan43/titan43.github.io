import {Link, Outlet } from 'react-router-dom';
import "../stylesheets/headers.css";
import "../stylesheets/links.css";
import "../stylesheets/button.css";

const Navbar = (props) => {
  return (
    <>
    <header>
      <h1>{props.sectionName}</h1>
      <nav>
        <ul>
          <li><Link to="/home" className="btn">Home</Link></li>
          <li><Link to="/shopping_cart" className="btn">Shopping Cart</Link></li>
          <li><Link to="/" className="btn">About</Link></li>
          <li><Link to="/account" className="btn">Account</Link></li>
          <li className="auth-buttons">
            {!props.isLoggedIn? (
              props.sectionName!=='Login'? (
                <>
                  <Link id="login-btn" to="/login" className="btn">Login</Link>
                  <Link id="register-btn" to="/register" className="btn">Register</Link>
                </>
              ) : <></>
            ):
            (<Link id="logout-btn" to="/login" className="btn remove">Logout</Link>)
            }
          </li>
        </ul>
      </nav>
    </header>
    <div className='main'>
      <Outlet/>
    </div>
    </>
  );
}

export default Navbar;
