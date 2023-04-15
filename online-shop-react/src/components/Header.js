import '../stylesheets/headers.css';
import Navbar from './Navbar'
import SectionName from './SectionName';

function Header(props) {
  return (<div>
    <header>
      <SectionName sectionName={props.sectionName}/>
      <Navbar onSectionChange={props.onSectionChange}
              removeCookie={props.removeCookie}
              isLoggedIn={props.isLoggedIn}
              setCookie={props.setCookie}/>
    </header>
  </div>);
}

export default Header;
