import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import About from "./components/About";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/404';
import Notification from './components/Notification';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [sectionName, setSectionName] = useState("About");
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [notificationUpdateTime, setNotificationUpdateTime] = useState(Date.now());

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
            <Route index element={<About setSectionName={setSectionName}/>}/>
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
            <Route path="*" element={<NotFound setSectionName={setSectionName}/>}/>
          </Route>
        </Routes>
        
      </BrowserRouter>
      <Notification message={message} type={type} notificationUpdateTime={notificationUpdateTime}/>
      </>
  );
}

export default App;