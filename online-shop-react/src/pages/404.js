import { useEffect } from 'react';
import '../stylesheets/headers.css';
import '../stylesheets/item.css';

const NotFound = ({setSectionName}) => {
    useEffect(()=>{
		setSectionName('Not Found')
	}, [setSectionName]);

    return <div className='item'>
        <h2>404 Not Found</h2>
    </div>;
}

export default NotFound;