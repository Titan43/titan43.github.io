const CartItem = ({ item, handleRemoveItem }) => {
    return (
        <div className='item'>
        <h2>{item.productName}</h2>
        <p>Quantity: {item.quantity}</p>
        <p>Total cost: {item.totalCost}</p>
        <button className='btn remove' onClick={() => handleRemoveItem(item.productId)}>
            Remove
        </button>
    </div>
    );
    };
    
export default CartItem;