import React, {useCallback, useEffect, useState } from 'react';
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
import OrderDetails from './components/OrderDetails';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [sectionName, setSectionName] = useState("Home");
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [notificationUpdateTime, setNotificationUpdateTime] = useState(Date.now());
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [userData, setUserData] = useState(null);
  const [previousSectionURL, setPreviousSectionURL] = useState('/');

  const isTokenValid = (token) => {
    if(!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = new Date(payload.exp * 1000);
    return expirationTime > new Date();
  }

  const [isLoggedIn, setIsLoggedIn] = useState(
    isTokenValid(cookies.token)
  );

  const validateToken = useCallback((action, args) => {
    setIsLoggedIn(isTokenValid(cookies.token));
    if(!isLoggedIn){
      if(action && args)
        action(args);
    }
    return isLoggedIn;
  }, [cookies.token, isLoggedIn]);

  useEffect(()=>{
    validateToken();
  }, [cookies.token, validateToken]);

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
            <Route index element={
              <Home setSectionName={setSectionName}
              setPreviousSectionURL={setPreviousSectionURL}
              />}/>
            <Route path='/login' 
              element={
                <Login
                  setSectionName={setSectionName} 
                  setCookie={setCookie}
                  removeCookie={removeCookie}
                  setIsLoggedIn={setIsLoggedIn}
                  handleMessage={handleMessage}
                  setUserId={setUserId}
                  previousSectionURL={previousSectionURL}
                />}
            />
            <Route path='/register' element={<Register setCookie={setCookie}
              setSectionName={setSectionName}
              removeCookie={removeCookie}
              setIsLoggedIn={setIsLoggedIn}
              handleMessage={handleMessage}
              setUserId={setUserId}
              previousSectionURL={previousSectionURL}
              />}
            />
            <Route path='/account' element={<Account
              sectionName={sectionName}
              cookies={cookies} 
              setSectionName={setSectionName}
              handleMessage={handleMessage}
              isLoggedIn={isLoggedIn}
              validateToken={validateToken}
              setPreviousSectionURL={setPreviousSectionURL}
              />}
            />
            <Route path='/shop' element={<ShopNow 
              handleMessage={handleMessage}
              setSectionName={setSectionName}
              role={role}
              userId={userId}
              cookies={cookies}
              validateToken={validateToken}
              setPreviousSectionURL={setPreviousSectionURL}
              />}/>
            <Route path='/shopping_cart' element={<ShoppingCart setSectionName={setSectionName}
              sectionName={sectionName}
              handleMessage={handleMessage}
              cookies={cookies}
              isLoggedIn={isLoggedIn}
              validateToken={validateToken}
              setPreviousSectionURL={setPreviousSectionURL}
              />}/> 
            <Route path="/orders" element={<OrderDetails orderId={1}
              cookies={cookies}
              role={role}
              setSectionName={setSectionName}
              previousSectionURL={previousSectionURL}
              setPreviousSectionURL={setPreviousSectionURL}
              handleMessage={handleMessage}
              validateToken={validateToken}/>}/>
            <Route path="*" element={<NotFound setSectionName={setSectionName}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Notification message={message} type={type} notificationUpdateTime={notificationUpdateTime}/>
      </>
  );
}

export default App;