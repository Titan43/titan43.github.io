import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import About from "./components/About";
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [sectionName, setSectionName] = useState("About");
  const [previousSectionName, setPreviousSectionName] = useState("About");

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar sectionName={sectionName} isLoggedIn={isLoggedIn}/>}>
            <Route index element={<About setSectionName={setSectionName}/>}/>
            <Route path='/login' 
              element={
                <Login
                  previousSectionName={previousSectionName}
                  setSectionName={setSectionName} 
                  setCookie={setCookie}
                  removeCookie={removeCookie}
                />}
            />
            <Route path="*" element={<h3>404 Not Found</h3>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;