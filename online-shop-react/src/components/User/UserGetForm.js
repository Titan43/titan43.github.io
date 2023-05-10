import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
import '../../stylesheets/form.css';
import { useState } from 'react';
import { UserData } from './UserData';

const UserGetForm = (props) => {

    const [username, setUsername] = useState('');
  
    const onSubmit = (event) => {
      event.preventDefault();
      UserData(props.cookies, props.setUser, 
       props.handleMessage, username);
      props.handleUserGetForm();
    }
  
    return (
          <form onSubmit={onSubmit} className='popup'>
                  <label htmlFor="username">Enter username:</label>
                  <input type="text"
              value={username} onChange={(event) => setUsername(event.target.value)}
              required/>
                  <button type="submit" className="btn">Get User</button>
                  <button
                    type="button"
                     className="btn remove"
                     onClick={props.handleUserGetForm}
                    >
                    Cancel
                  </button>
          </form>
    );
  }
  
  export default UserGetForm;
