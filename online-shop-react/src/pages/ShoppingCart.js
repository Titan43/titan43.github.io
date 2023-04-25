import { useEffect, useState } from "react";
import "../stylesheets/item.css";
import CartTotal from "../components/ShoppingCart/CartTotal";
import { useNavigate } from "react-router-dom";
import { CartData } from "../components/ShoppingCart/CartData";
import CartItem from "../components/ShoppingCart/CartItem";
import { RemoveCartItem } from "../components/ShoppingCart/RemoveCartItem";
import { CancelOrder } from "../components/ShoppingCart/CancelOrder";
import { ConfirmOrder } from "../components/ShoppingCart/ConfirmOrder";

const ShoppingCart = (props) => {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
    setCartLoaded(false);
  };

  const handleCancel = () => {
    CancelOrder(props.cookies, props.handleMessage)
      .then(() => {
        setCartData(null);
        setIsLoading(false);
      })
    setCartLoaded(false);
  };

  const handleConfirm = () => {
    ConfirmOrder(props.cookies, setConfirmed, props.handleMessage);
  };

  useEffect(()=>{
    if(confirmed){
      setCartData(null);
    }
  }, [confirmed]);

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
          <CartTotal total={cartData.total_price} 
            handleCancel={handleCancel} 
            handleConfirm={handleConfirm}/>
        </>
      ) : (
        <h2>You haven't ordered anything</h2>
      )}
    </div>
  );
};

export default ShoppingCart;
