import React from 'react';

const OrderElement = ({ order, handleViewOrder}) => {
  return (
    <div className="item">
      <h2>Order ID: {order.id}</h2>
      <p>Username: {order.username}</p>
      <p>Total Cost: {order.totalCost}</p>
      <p>Order Date: {order.date}</p>
      <p>Confirmed: {order.confirmed.toString()}</p>
      <button className="btn" onClick={()=>{handleViewOrder(order.id)}}>
        View order
      </button>
    </div>
  );
}
export default OrderElement;