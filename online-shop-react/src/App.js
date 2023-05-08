import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/404';
import Notification from './components/Notification';
import Account from './pages/Account';
import ShopNow from './pages/ShopNow';
import { UserData } from './components/User/UserData';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [sectionName, setSectionName] = useState("Home");
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [notificationUpdateTime, setNotificationUpdateTime] = useState(Date.now());
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [userData, setUserData] = useState(null);

  function isTokenValid(token){
    if(!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = new Date(payload.exp * 1000);
    return expirationTime > new Date();
  }

  const [isLoggedIn, setIsLoggedIn] = useState(
    isTokenValid(cookies.token)
  );

  useEffect(()=>{
    setIsLoggedIn(isTokenValid(cookies.token))
  }, [cookies.token]);

  useEffect(()=>{
    if(isLoggedIn && cookies.token){
      UserData(cookies, setUserData, handleMessage)
    }
  }, [isLoggedIn, cookies]);

  useEffect(()=>{
    if(userData){
      setUserId(userData.id);
      setRole(userData.role);
      setUserData(null);
    }
  }, [userData]);

  const handleMessage = (m, t) =>{
    setMessage(m);
    setType(t);
    setNotificationUpdateTime(Date.now());
  }
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Navbar sectionName={sectionName} isLoggedIn={isLoggedIn}/>}>
            <Route index element={<Home setSectionName={setSectionName}/>}/>
            <Route path='/login' 
              element={
                <Login
                  setSectionName={setSectionName} 
                  setCookie={setCookie}
                  removeCookie={removeCookie}
                  handleMessage={handleMessage}
                />}
            />
            <Route path='/register' element={<Register setCookie={setCookie}
              setSectionName={setSectionName}
              handleMessage={handleMessage}
              />}
            />
            <Route path='/account' element={<Account
            sectionName={sectionName}
              cookies={cookies} 
              setSectionName={setSectionName}
              isLoggedIn={isLoggedIn}
              handleMessage={handleMessage}
              />}
            />
            <Route path='/shop' element={<ShopNow 
              isLoggedIn={isLoggedIn}
              handleMessage={handleMessage}
              setSectionName={setSectionName}
              role={role}
              userId={userId}
              cookies={cookies}
              />}/>
            <Route path='/shopping_cart' element={<ShoppingCart setSectionName={setSectionName}
              sectionName={sectionName}
              isLoggedIn={isLoggedIn}
              handleMessage={handleMessage}
              cookies={cookies}
              />}/>
            <Route path="*" element={<NotFound setSectionName={setSectionName}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Notification message={message} type={type} notificationUpdateTime={notificationUpdateTime}/>
      </>
  );
}

export default App;