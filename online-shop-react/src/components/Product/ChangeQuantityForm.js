import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
import '../../stylesheets/form.css';
import { useState } from 'react';

const ChangeQuantityForm = (props) => {

    const [quantity, setQuantity] = useState('');
  
    const onSubmit = (event) => {
      event.preventDefault();
    }
  
    return (
      <div className='popup'>
          <form onSubmit={onSubmit}>
                  <label htmlFor="quantity">Change Quantity by:</label>
                  <input type="number"
              value={quantity} onChange={(event) => setQuantity(event.target.value)}
              required/>
                  <button type="submit" className="btn">Change</button>
                  <button
                    type="button"
                     className="btn remove"
                     onClick={props.handleChangeQuantityForm}
                    >
                    Cancel
                    </button>
          </form>
        </div>
    );
  }
  
  export default ChangeQuantityForm;
