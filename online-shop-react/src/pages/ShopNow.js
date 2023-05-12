import { useEffect, useState, useCallback, useRef} from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/Product/ProductItem";
import ProductLoadButtons from "../components/Product/ProductLoadButtons";
import { PRODUCT_LINK } from "../components/constants";
import "../stylesheets/item.css";
import LoadingSpinner from "../components/Loading";
import AddProductForm from "../components/Product/AddProductForm"
import ChangeQuantityForm from "../components/Product/ChangeQuantityForm";
import OrderProductForm from "../components/Product/OrderProductForm";

const ShopNow = (props) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showChangeQuantity, setShowChangeQuantity] = useState(false);
  const [showOrderProduct, setShowOrderProduct] = useState(false);

  const[currentQuantity, setCurrentQuantity] = useState(0);
  const[prodId, setProdId] = useState(0);
  const[prodName, setProdName] = useState('');

  const isEmptyRef = useRef(false);

  const navigate = useNavigate();

  const handleAddProductForm = () => {
    props.validateToken(navigate, '/login');
    setShowAddProduct(!showAddProduct);
  }

  const handleShowOrderProduct = (prod_id, quantity, prodName) => {
    props.validateToken(navigate, '/login');
    setProdId(prod_id);
    setCurrentQuantity(quantity);
    setProdName(prodName);
    setShowOrderProduct(!showOrderProduct);
  }

  const toggleEmpty = () => {
    if(isEmptyRef.current){
      isEmptyRef.current = false;
    }
  }

  const handleChangeQuantityForm = (prod_id, quantity) => {
    props.validateToken(navigate, '/login');
    setCurrentQuantity(quantity)
    setProdId(prod_id);
    setShowChangeQuantity(!showChangeQuantity);
  }

  const loadPrevItems = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    else{
        props.handleMessage("Can't load previous products(CODE 404)", 'error');
    }
  }, [currentPage, props]);

  function loadNextItems() {
    setCurrentPage(currentPage + 1);
  }
  
  useEffect(()=>{
    props.setPreviousSectionURL('/shop');
		props.setSectionName('Shop Now');
	}, [props]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      if(!isEmptyRef.current)
      try {
        const response = await fetch(
          `${PRODUCT_LINK}/products?page=${currentPage}&count=9`
        );
        if (!response.ok) {
          return response.text().then((error) => {
            throw new Error(error);
          });
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setItems(data);
        } else {
          props.handleMessage("Can't load more products(CODE 404)", 'error');
          if(currentPage>0){
            loadPrevItems();
          }
          else{
            isEmptyRef.current = true;
          }
        }
      } catch (error) {
        props.handleMessage(error, 'error');
      }
      setLoading(false);
    };
    setTimeout(() => {
      fetchProducts();
    }, 150);
  }, [currentPage, loadPrevItems, props]);
  

  return (
    <>
      {
        showOrderProduct?
        <OrderProductForm
        handleMessage={props.handleMessage}
        cookies={props.cookies} 
        handleShowOrderProduct={handleShowOrderProduct}
        prodId={prodId}
        prodName={prodName}
        currentQuantity={currentQuantity}
        />
        :
        <></>
      }
      {
        showChangeQuantity?
        <ChangeQuantityForm
        handleMessage={props.handleMessage}
        cookies={props.cookies} 
        handleChangeQuantityForm={handleChangeQuantityForm}
        currentQuantity={currentQuantity}
        prodId={prodId}/>
        :
        <></>
      }
      {
        showAddProduct? 
          <AddProductForm handleAddProductForm={handleAddProductForm}
            cookies={props.cookies}
            handleMessage={props.handleMessage}
            toggleEmpty={toggleEmpty}
          />
        : <>
        </>
      }
    <div className={`item ${showAddProduct 
      || showChangeQuantity
      || showOrderProduct ? 'blur' : ''}`}>
      {loading ? (
        <LoadingSpinner/>
      ) : items.length > 0 ? (
        <div className="items">
          {
          items.map((item) => (
            <ProductItem 
              userId={props.userId} role={props.role} item={item} key={item.id} 
              handleChangeQuantityForm={handleChangeQuantityForm}
              handleShowOrderProduct={handleShowOrderProduct}/>
          ))}
        </div>
      ) : (
        <div>
          <h2>No products to display</h2>
        </div>
      )}
      <ProductLoadButtons role={props.role} onPrevClick={loadPrevItems} 
        onNextClick={loadNextItems}
        handleAddProductForm={handleAddProductForm}
        isEmpty={isEmptyRef.current}/>
    </div>
    </>
  );
}

export default ShopNow;