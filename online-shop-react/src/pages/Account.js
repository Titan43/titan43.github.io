import {useEffect, useState} from 'react';
import '../stylesheets/headers.css';
import '../stylesheets/item.css';
import '../stylesheets/popup.css';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/User/Dashboard';
import UpdateUserForm from '../components/User/UserUpdateForm';
import UserBlock from '../components/User/UserView';
import { UserData } from '../components/User/UserData';
import { UserDelete } from '../components/User/UserDelete';
import LoadingSpinner from '../components/Loading';
import UserGetForm from '../components/User/UserGetForm';
import ChangeRoleButtons from '../components/User/ChangeRoleButtons';

const Account = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [userObtained, setUserObtained] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if(props.validateToken(navigate, '/login'))
            UserData(props.cookies, setUser, props.handleMessage).then(() => {
                setDataLoaded(true);
        });
    }, [props, navigate]);

    const [showUserUpdate, setShowUserUpdate] = useState(false);
    const [showUserGet, setShowUserGet] = useState(false);

    const handleUserObtain = () => {
        UserData(props.cookies, userObtained? setUserObtained:
             setUser, props.handleMessage, userObtained? 
             userObtained.username: null);
    }

    const handleViewOrders = () =>{
        navigate('/orders');
    }

    const handleUserUpdateForm = () => {
        props.validateToken(navigate, '/login');
        setShowUserUpdate(!showUserUpdate);
    }

    const handleUserGetForm = () => {
        props.validateToken(navigate, '/login');
        setShowUserGet(!showUserGet);
    }

    const handleUserDelete = () => {
        if(props.validateToken(navigate, '/login'))
            UserDelete(user.username, props.cookies, navigate, props.handleMessage);
    }

    useEffect(()=>{
        props.setPreviousSectionURL('/account');
		props.setSectionName('Account');
	}, [props]);

    return (
        <>
        {showUserUpdate ? (
                <UpdateUserForm handleUserUpdateForm={handleUserUpdateForm} 
                    username={userObtained? userObtained.username
                        : user.username}
                    cookies={props.cookies}
                    handleMessage={props.handleMessage}
                    handleUserObtain={handleUserObtain}/>
                ) : (<></>)
        }
        {showUserGet ? (
                <UserGetForm
                    username={user.username}
                    handleUserGetForm={handleUserGetForm}
                    cookies={props.cookies}
                    handleMessage={props.handleMessage}
                    setUser={setUserObtained}/>)
            :
            (<></>)
        }
        <div className={`item ${showUserUpdate || showUserGet
             ? 'blur' : ''}`}>
          <div className="cart-items">
          {dataLoaded ? (
             <>
                <UserBlock user={userObtained? userObtained : user} />
                {user && userObtained? <ChangeRoleButtons username={userObtained.username} role={userObtained.role}
                    cookies={props.cookies} handleMessage={props.handleMessage} handleUserObtain={handleUserObtain}/> : <></>}
                {user && <Dashboard userRole={user.role} 
                    handleUserUpdateForm={handleUserUpdateForm}
                    handleViewOrders={handleViewOrders}
                    handleUserDelete={handleUserDelete}
                    handleUserGetForm={handleUserGetForm}/>}
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
