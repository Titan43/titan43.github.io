import React, { useState } from 'react';
import Header from './components/Header';
import { useCookies } from 'react-cookie';

function App() {
  const [sectionName, setSectionName] = useState('About');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const token = cookies.token;
  function handleSectionChange(newSectionName) {
    setSectionName(newSectionName);
  }

  return (
    <div>
      <Header onSectionChange={handleSectionChange} 
            sectionName={sectionName}
            token={token}
            removeCookie={removeCookie}/>
    </div>
  );
}

export default App;