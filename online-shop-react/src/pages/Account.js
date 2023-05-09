import {useEffect, useState} from 'react';
import '../stylesheets/headers.css';
import '../stylesheets/item.css';
import '../stylesheets/popup.css';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UpdateUserForm from '../components/User/UserUpdateForm';
import UserBlock from '../components/User/UserView';
import { UserData } from '../components/User/UserData';
import { UserDelete } from '../components/User/UserDelete';
import LoadingSpinner from '../components/Loading';

const Account = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        props.validateToken(navigate, '/login');
        if(props.isLoggedIn)
            UserData(props.cookies, setUser, props.handleMessage).then(() => {
                setDataLoaded(true);
        });
    }, [props, navigate]);

    const [showUserUpdate, setShowUserUpdate] = useState(false);

    const handleUserUpdateForm = () => {
        props.validateToken(navigate, '/login');
        setShowUserUpdate(!showUserUpdate);
    }

    const handleUserDelete = () => {
        props.validateToken(navigate, '/login');
        UserDelete(user.username, props.cookies, navigate, props.handleMessage);
    }
    
    useEffect(()=>{
		props.setSectionName('Account');
	}, [props]);

    return (
        <>
        {showUserUpdate ? (
                <UpdateUserForm handleUserUpdateForm={handleUserUpdateForm} 
                    username={user.username}
                    cookies={props.cookies}
                    handleMessage={props.handleMessage}/>
                ) : (
                <></>
                )}
        <div className={`item ${showUserUpdate ? 'blur' : ''}`}>
          <div className="cart-items">
          {dataLoaded ? (
             <>
                <UserBlock user={user} />
                {user && <Dashboard userRole={user.role} 
                    handleUserUpdateForm={handleUserUpdateForm}
                    handleUserDelete={handleUserDelete} />}
            </>
            ) : (
            <LoadingSpinner/>
            )}
          </div>
        </div>
        </>
    );
}

export default Account;
