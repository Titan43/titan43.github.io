import { useEffect, useState} from "react";
import "../stylesheets/item.css";
import CartTotal from "../components/ShoppingCart/CartTotal";
import { useNavigate } from "react-router-dom";
import { CartData } from "../components/ShoppingCart/CartData";
import CartItem from "../components/ShoppingCart/CartItem";
import { RemoveCartItem } from "../components/ShoppingCart/RemoveCartItem";

const ShoppingCart = (props) => {
  
  const navigate = useNavigate();

  const [cartData, setCartData] = useState(null);
  const [cartUpdateTime, setCartUpdateTime] = useState(Date.now());
  const [cartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    if (!props.isLoggedIn) {
        if(props.sectionName!=='Login')
            navigate('/login');
    }else{
      if(!cartEmpty)
        CartData(props.cookies, setCartData, setCartEmpty, props.handleMessage);
    }
    props.setSectionName('Shopping cart');
}, [props, navigate, cartUpdateTime, cartEmpty]);

  const handleRemoveItem = (product_id) => {
    RemoveCartItem(props.cookies, product_id, props.handleMessage);
    setCartUpdateTime(Date.now());
  }

  return (
    <div className = "item">
      { cartData &&
        cartData.ordered_products.length>0 ?
        (<>
          <div className="cart-items">
            {cartData.ordered_products.map((item)=>
              (<CartItem item={item} key={item.productId} handleRemoveItem={handleRemoveItem}/>)
            )}
          </div>
          <CartTotal total={cartData.total_price}/>
        </>
        )
        :
          <h2>
            You haven't ordered anything
          </h2>
      }
    </div>
  );
}

export default ShoppingCart;
