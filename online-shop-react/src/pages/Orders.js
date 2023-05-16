import { useEffect, useState, useCallback, useRef} from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/item.css";
import LoadingSpinner from "../components/Loading";
import LoadButtons from "../components/Product/LoadButtons";
import OrderElement from "../components/Product/OrderElement";
import OrderDetails from "../components/Product/OrderDetails";
import { fetchOrders } from "../components/Product/LoadOrders";

const Orders = (props) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);

  const isEmptyRef = useRef(false);

  const navigate = useNavigate();

  const loadPrevItems = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    else{
        props.handleMessage("Can't load previous products(CODE 404)", 'error');
    }
  }, [currentPage, props]);

  const loadNextItems = () => {
    setCurrentPage(currentPage + 1);
  }

  const handleViewOrder = (id) => {
      setOrderId(id);
  }
  
  useEffect(()=>{
    props.setPreviousSectionURL('/orders');
		props.setSectionName(orderId? 'Order id: '+orderId : 'Orders');
	}, [props, orderId]);

  useEffect(() => {
    setLoading(true);
    if(props.validateToken(navigate, '/login'))
      setTimeout(() => {
        fetchOrders(isEmptyRef, currentPage, props.cookies, setItems, loadPrevItems, setLoading, props.handleMessage);
      }, 150);
  }, [currentPage, loadPrevItems, props, navigate]);
  
  return (
    <div className='item'>
      {orderId ? (
        <OrderDetails orderId={orderId}
          role={props.role}
          cookies={props.cookies}
          navigate={navigate} 
          handleViewOrder={handleViewOrder}
          handleMessage={props.handleMessage}
          validateToken={props.validateToken}/>
      ) : loading ? (
        <LoadingSpinner />
      ) : items.length > 0 ? (
        <>
        <div className="cart-items">
          {items.map((item) => {
            return (
              <OrderElement key={item.id} order={item} handleViewOrder={handleViewOrder} />
            );
          })}
        </div>
        <LoadButtons
        onPrevClick={loadPrevItems}
        onNextClick={loadNextItems}
        isEmpty={isEmptyRef.current}
      />
        </>
      ) : (
        <div>
          <h2>No orders to display</h2>
        </div>
      )}
    </div>
  );
}

export default Orders;