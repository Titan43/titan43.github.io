import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../stylesheets/headers.css';
import '../stylesheets/links.css';
import '../stylesheets/button.css';

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header>
        <h1>{props.sectionName}</h1>
          <div className='menu'>
          {!showMenu?
          <button className="btn" onClick={toggleMenu}>
            Menu
          </button>
          :
          <button className="btn" onClick={toggleMenu}>
            Hide menu
          </button>
          }
          </div>
          <nav className={showMenu? 'sidebar':'navmenu'}>
            <ul>
              <li>
                <Link to="/shop" className="btn">
                  Shop now
                </Link>
              </li>
              <li>
                <Link to="/shopping_cart" className="btn">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/" className="btn">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/account" className="btn">
                  Account
                </Link>
              </li>
              <li className="auth-buttons">
                {!props.isLoggedIn ? (
                  props.sectionName !== 'Login' &&
                  props.sectionName !== 'Register' ? (
                    <>
                      <Link id="login-btn" to="/login" className="btn">
                        Login
                      </Link>
                      <Link id="register-btn" to="/register" className="btn">
                        Register
                      </Link>
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <Link id="logout-btn" to="/login" className="btn">
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
      </header>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
