import { useEffect, useState, useRef} from "react";
import "../stylesheets/item.css";
import { useNavigate } from "react-router-dom";
import { ORDER_LINK } from '../components/constants';
import LoadingSpinner from "../components/Loading";
import CartListing from "../components/ShoppingCart/CartListing";

const ShoppingCart = (props) => {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartUpdateTime, setCartUpdateTime] = useState(Date.now());

  const cookies = props.cookies;
  const handleMessage = props.handleMessage;

  const handleMessageRef = useRef(handleMessage);
  const isLoadingRef = useRef(isLoading);
  const isLoggedInRef = useRef(props.isTokenValid(cookies.token));

  useEffect(() => {
    props.setSectionName("Shopping cart");
    if (!isLoggedInRef.current) {
      if (props.sectionName !== "Login") navigate("/login");
    }
  }, [props, navigate]);

  useEffect(() => {
    setIsLoading(true);
    const obtainCartData = async () => {
      if(!isLoadingRef.current && isLoggedInRef.current)
      try {
        //ACHTUNG, КОСТИЛЬ!
        isLoadingRef.current = true;
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Request timed out"));
          }, 1000);
        });
  
        const response = await Promise.race([
          fetch(`${ORDER_LINK}/myOrder`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.token}`,
            },
          }),
          timeoutPromise,
        ]);
  
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        } else {
          const data = await response.json();
          setCartData(data);
          setIsLoading(false);
          isLoadingRef.current=false;
        }
      } catch (error) {
        handleMessageRef.current(error.message, "error");
        setCartData(null);
        setIsLoading(false);
        isLoadingRef.current=false;
      }
    };
    setTimeout(() => {
      obtainCartData();
    }, 150);
    
  }, [cookies, cartUpdateTime, isLoadingRef, isLoggedInRef, navigate]);

  return (
    <div className="item">
      {isLoading ? (
        <LoadingSpinner />
      ) : cartData && cartData.ordered_products.length > 0 ? (
        <CartListing
          setCartUpdateTime={setCartUpdateTime}
          cookies={cookies}
          handleMessage={handleMessage}
          cartData={cartData}
          setCartData={setCartData}
          isTokenValid={props.isTokenValid}
          navigate={navigate}
        />
      ) : (
        <h2>You haven't ordered anything</h2>
      )}
    </div>
  );
};

export default ShoppingCart;
