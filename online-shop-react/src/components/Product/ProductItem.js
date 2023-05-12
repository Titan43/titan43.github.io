import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';

function ProductItem(props) {
    const { id, name, description, price, quantity, image} = props.item;
    const isOutOfStock = quantity===0;
    return (
        <div className="item">
            <h2>{name}</h2>
            <img src={`data:image/png;base64,${image}`} alt="Something went wrong"/>
            <p>Product Id: {id}</p>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
            <p>Available: {quantity}</p>
            {props.userId===props.item.user_id && props.role === 'VENDOR'
                ?
                <button className="btn" 
                    onClick={()=>{props.handleChangeQuantityForm(id, quantity)}}>
                        Change quantity
                </button>
                :
                <button disabled={isOutOfStock} 
                className={`btn ${isOutOfStock? 'remove disable' : ''}`} 
                onClick={() => { props.handleShowOrderProduct(id, quantity, name)}}>
                    {isOutOfStock? 'Out of stock' : 'Add to Cart'}</button>
            }
        </div>
    );
}

export default ProductItem;