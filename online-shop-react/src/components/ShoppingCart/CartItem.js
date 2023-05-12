const CartItem = ({ item, handleRemoveItem }) => {
    return (
        <div className='item'>
        <h2>{item.productName}</h2>
        <img src={`data:image/png;base64,${item.image}`} alt="Something went wrong"/>
        <p>Quantity: {item.quantity}</p>
        <p>Total cost: {item.totalCost}</p>
        <button className='btn remove' onClick={() => handleRemoveItem(item.productId)}>
            Remove
        </button>
    </div>
    );
    };
    
export default CartItem;