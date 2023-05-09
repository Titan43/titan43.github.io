import CartItem from "./CartItem";
import { RemoveCartItem } from "./RemoveCartItem";
import { CancelOrder } from "./CancelOrder";
import { ConfirmOrder } from "./ConfirmOrder";
import CartTotal from "./CartTotal";

const CartListing = (props) => {
  const handleRemoveItem = (product_id) => {
    props.validateToken(props.navigate, '/login');
    RemoveCartItem(props.cookies, product_id, props.handleMessage)
      .then(()=>{props.setCartUpdateTime(Date.now())}
    );
  };

  const handleCancel = () => {
    props.validateToken(props.navigate, '/login');
    CancelOrder(props.cookies, props.handleMessage).then(() => {
      props.setCartData(null);
    });
  };

  const handleConfirm = () => {
    props.validateToken(props.navigate, '/login');
    ConfirmOrder(props.cookies, props.setCartData, props.handleMessage);
  };

  return (
    <div className="cart-items">
      {!props.isLoading ? (
        <>
          {props.cartData.ordered_products.map((item) => (
          <CartItem
              item={item}
              key={item.productId}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
          <CartTotal
            total={props.cartData.total_price}
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartListing;
