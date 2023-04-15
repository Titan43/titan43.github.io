import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { useCookies } from 'react-cookie';

function App() {
  const [sectionName, setSectionName] = useState('About');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  function handleSectionChange(newSectionName) {
    setSectionName(newSectionName);
  }

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

  return (
    <div className='App'>
      <Header onSectionChange={handleSectionChange} 
            sectionName={sectionName}
            isLoggedIn={isLoggedIn}
            removeCookie={removeCookie}
            setCookie={setCookie}/>
    </div>
  );
}

export default App;