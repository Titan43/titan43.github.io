import { useEffect, useState } from 'react';
import '../stylesheets/headers.css';
import '../stylesheets/item.css';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UpdateUserForm from '../components/UserUpdate';

const Account = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!props.isLoggedIn) {
            navigate('/login');
        }
    }, [props.isLoggedIn, navigate]);
    

    const [showUserUpdate, setShowUserUpdate] = useState(false);

    const handleUserUpdateForm = () => {
        showUserUpdate? setShowUserUpdate(false)
            : setShowUserUpdate(true);
    }

    props.setSectionName('Account');

    return <div className='item'>
        <div className='cart-items'>
        { showUserUpdate ? 
            (<UpdateUserForm handleUserUpdateForm={handleUserUpdateForm}/>) : <></>
        }
        <Dashboard handleUserUpdateForm={handleUserUpdateForm}/>
        </div>
    </div>
}

export default Account;