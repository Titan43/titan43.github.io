import '../stylesheets/headers.css';
import '../stylesheets/item.css';

const NotFound = ({setSectionName}) => {
    setSectionName('Not Found')
    return <div className='item'>
        <h2>404 Not Found</h2>
    </div>;
}

export default NotFound;