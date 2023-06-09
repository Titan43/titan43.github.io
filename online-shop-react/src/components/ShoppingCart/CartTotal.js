import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
function CartTotal(props) {

    return (
        <div className="cart-total item">
            <h3>Total: {props.total}</h3>
            <button href="#" className="btn" id = "orderBtn" onClick={props.handleConfirm}>Order</button>
            <button href="#" className="btn remove" id = "cancelOrderBtn" onClick={props.handleCancel}>Cancel</button>
        </div>
    );
}

export default CartTotal;