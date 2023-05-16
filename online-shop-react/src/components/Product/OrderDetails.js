import { useEffect, useState } from 'react';
import LoadingSpinner from '../Loading';
import { fetchOrder } from './FetchOrder';

function OrderDetails(props) {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.setPreviousSectionURL('/account');
    props.setSectionName("Order id:"+props.orderId);
  }, [props]);

  useEffect(() => {
    if(props.validateToken(props.navigate, "/login")){
      if(props.role==="MANAGER" && isLoading)
        fetchOrder(props.orderId, props.cookies, setOrder, props.handleMessage).then(()=>{
          setIsLoading(false);
        });
      else if(props.role!==""){
        props.navigate(props.previousSectionURL);
      }
    }
  }, [props, isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner/>
      ) : order && props.role === "MANAGER" ? (
        <div id='item-to-order'>
          <div className='item'>
            <h2>Order</h2>
            <p>Order Date: {order.date}</p>
            <p>Order Owner: {order.order_owner}</p>
            <p>Total Price: {order.total_price}</p>
            <p>Confirmed: {order.confirmed.toString()}</p>
          </div>
          <div className='cart-items item'>
            <h2>Ordered Products:</h2>
            <ul>
              {order.ordered_products.map((product) => (
                <li key={product.productId} className='item'>
                  <img src={`data:image/png;base64,${product.image}`} alt="Something went wrong"/>
                  <p>Product Name: {product.productName}</p>
                  <p>Product Id: {product.productId}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Total Cost: {product.totalCost}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <h2>Order cannot be viewed</h2>
      )}
    </>
  );
}

export default OrderDetails;
