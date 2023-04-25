import { useEffect, useState } from 'react';
import '../stylesheets/headers.css';
import '../stylesheets/item.css';
import '../stylesheets/popup.css';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UpdateUserForm from '../components/UserUpdateForm';
import UserBlock from '../components/UserView';
import { UserData } from '../components/UserData';
import { UserDelete } from '../components/UserDelete';

const Account = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!props.isLoggedIn) {
            if(props.sectionName!=='Login')
                navigate('/login');
        }
        else{
        UserData(props.cookies, setUser, props.handleMessage).then(() => {
            setDataLoaded(true);
        });
    }
    }, [props, navigate]);

    const [showUserUpdate, setShowUserUpdate] = useState(false);

    const handleUserUpdateForm = () => {
        showUserUpdate? setShowUserUpdate(false)
            : setShowUserUpdate(true);
    }

    const handleUserDelete = () => {
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
            <div>Loading...</div>
            )}
          </div>
        </div>
        </>
    );
}

export default Account;
