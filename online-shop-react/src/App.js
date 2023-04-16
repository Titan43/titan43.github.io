import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import { useCookies } from 'react-cookie';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';

function App() {
  const [sectionName, setSectionName] = useState('About');
  const [previousSectionName, setPreviousSectionName] = useState('About');
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

  function Body(sectionName){
    switch(sectionName){
      case 'About':
        return <About/>;
      case 'Login':
        return <Login 
          onSectionChange={setSectionName}
          previousSectionName={previousSectionName} 
          setCookie={setCookie}/>;
      case 'Register':
        return <Register onSectionChange={setSectionName}/>;
      case 'Home':
        return <ProductList/>;
      default:
        return <div>
          <h3>Something went wrong</h3>
          </div>;
    }
  }

  return (
    <div className='App'>
        <Header onSectionChange={handleSectionChange} 
            setPreviousSectionName={setPreviousSectionName}
            sectionName={sectionName}
            isLoggedIn={isLoggedIn}
            removeCookie={removeCookie}
            setCookie={setCookie}/>
        <div className='main'>
          {Body(sectionName)}
        </div>
    </div>
  );
}

export default App;