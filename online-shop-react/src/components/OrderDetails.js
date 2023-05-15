import { useEffect, useState } from 'react';
import LoadingSpinner from './Loading';
import { ORDER_LINK } from './constants';
import { useNavigate } from 'react-router-dom';

function OrderDetails(props) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    props.setPreviousSectionURL('/account');
    props.setSectionName("Order id:"+props.orderId);
  }, [props]);

  useEffect(() => {
    const orderId = props.orderId;
    const token = props.cookies.token;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`${ORDER_LINK}/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }

        const data = await response.json();
        setOrder(data);
      } catch (error) {
        props.handleMessage(error.message, 'error');
      } finally {
        setLoading(false);
      }
    }
    
    if(props.validateToken(navigate, "/login")){
      if(props.role==="MANAGER")
        fetchOrder();
      else if(props.role!==""){
        navigate(props.previousSectionURL);
      }
    }
  }, [props, navigate]);

  return (
    <div className='item'>
      {loading ? (
        <LoadingSpinner />
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
    </div>
  );
}

export default OrderDetails;
