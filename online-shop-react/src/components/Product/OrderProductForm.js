import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
import '../../stylesheets/form.css';
import { useState } from 'react';
import { orderProduct } from './OrderProduct';

const OrderProductForm = (props) => {

    const [quantity, setQuantity] = useState('');
  
    const onSubmit = (event) => {
      event.preventDefault();
      orderProduct(props.cookies, props.prodId, 
      Math.floor(quantity), props.handleMessage);
      props.handleShowOrderProduct();
    }
  
    return (
          <form onSubmit={onSubmit} className='popup'>
                  <p>Product name:{props.prodName}</p>
                  <p>Available:{props.currentQuantity}</p>
                  <label htmlFor="quantity">Amount of products to orders:</label>
                  <input type="number" step={1}
              value={quantity} onChange={(event) => setQuantity(event.target.value)}
              required/>
                  <button type="submit" className="btn">Order</button>
                  <button
                    type="button"
                     className="btn remove"
                     onClick={props.handleShowOrderProduct}
                    >
                    Cancel
                  </button>
          </form>
    );
  }
  
  export default OrderProductForm;