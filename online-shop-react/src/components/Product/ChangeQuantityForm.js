import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
import '../../stylesheets/form.css';
import { useState } from 'react';
import { changeQuantityBy } from './ChangeQuantity';

const ChangeQuantityForm = (props) => {

    const [quantity, setQuantity] = useState('');
  
    const onSubmit = (event) => {
      event.preventDefault();
      changeQuantityBy(props.cookies, props.prodId, 
      Math.floor(quantity), props.handleMessage);
      setQuantity('');
      props.handleChangeQuantityForm();
    }
  
    return (
          <form onSubmit={onSubmit} className='popup'>
                  <p>Current Quantity: {props.currentQuantity}</p>
                  <label htmlFor="quantity">Change quantity by:</label>
                  <input type="number" step={1}
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
    );
  }
  
  export default ChangeQuantityForm;
