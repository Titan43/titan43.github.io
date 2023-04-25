import { useEffect, useState} from "react";
import "../stylesheets/item.css";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { CartData } from "../components/CartData";
import CartItem from "../components/CartItem";
import { RemoveCartItem } from "../components/RemoveCartItem";

const ShoppingCart = (props) => {
  
  const navigate = useNavigate();

  const [cartData, setCartData] = useState(null);
  const [cartUpdateTime, setCartUpdateTime] = useState(Date.now());

  useEffect(()=>{
		props.setSectionName('Shopping cart');
	}, [props]);

  useEffect(() => {
      if (!props.isLoggedIn) {
          if(props.sectionName!=='Login')
              navigate('/login');
      }else{
        CartData(props.cookies, setCartData, props.handleMessage);
      }
  }, [props, navigate, cartUpdateTime]);

  const handleRemoveItem = (product_id) => {
    RemoveCartItem(props.cookies, product_id, props.handleMessage);
    setCartUpdateTime(Date.now());
  }

  return (
    <div className = "item">
      { cartData ?
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
          <></>
        :
          <></>
      }
    </div>
  );
}

export default ShoppingCart;
