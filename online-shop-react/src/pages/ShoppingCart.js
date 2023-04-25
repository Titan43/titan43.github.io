import { useEffect, useState } from "react";
import "../stylesheets/item.css";
import CartTotal from "../components/ShoppingCart/CartTotal";
import { useNavigate } from "react-router-dom";
import { CartData } from "../components/ShoppingCart/CartData";
import CartItem from "../components/ShoppingCart/CartItem";
import { RemoveCartItem } from "../components/ShoppingCart/RemoveCartItem";
import { CancelOrder } from "../components/ShoppingCart/CancelOrder";

const ShoppingCart = (props) => {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!props.isLoggedIn) {
      if (props.sectionName !== "Login") navigate("/login");
    } else {
      if (!isLoading && !cartLoaded) {
        setIsLoading(true);
        CartData(props.cookies, setCartData, setIsLoading, setCartLoaded, props.handleMessage)
      }
    }
    props.setSectionName("Shopping cart");
  }, [props, navigate, isLoading, cartLoaded]); 

  const handleRemoveItem = (product_id) => {
    RemoveCartItem(props.cookies, product_id, props.handleMessage);
  };

  const handleCancel = () => {
    CancelOrder(props.cookies, props.handleMessage)
      .then(() => {
        setCartData(null);
        setIsLoading(false);
      })
    setCartLoaded(false);
  };

  return (
    <div className="item">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : cartData && cartData.ordered_products.length > 0 ? (
        <>
          <div className="cart-items">
            {cartData.ordered_products.map((item) => (
              <CartItem
                item={item}
                key={item.productId}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
          <CartTotal total={cartData.total_price} handleCancel={handleCancel} />
        </>
      ) : (
        <h2>You haven't ordered anything</h2>
      )}
    </div>
  );
};

export default ShoppingCart;
