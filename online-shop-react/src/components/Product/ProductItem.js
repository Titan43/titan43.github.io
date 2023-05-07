import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';

function ProductItem(props) {
    const { id, name, description, price, quantity } = props.item;

    return (
        <div className="item">
            <h2>{name}</h2>
            <p>Product Id: {id}</p>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
            <p>Available: {quantity}</p>
            {props.userId===props.item.user_id && props.role === 'VENDOR'
                ?
                <button className="btn" >Change quantity</button>
                :
                <button className="btn" >Add to Cart</button>
            }
        </div>
    );
}

export default ProductItem;
