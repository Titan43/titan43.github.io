import '../stylesheets/headers.css';
import Navbar from './Navbar'
import SectionName from './SectionName';

function Header(props) {
  return (<div>
    <header>
      <SectionName sectionName={props.sectionName}/>
      <Navbar onSectionChange={props.onSectionChange}
              removeCookie={props.removeCookie}
              token={props.token}/>
    </header>
  </div>);
}

export default Header;
