import { useEffect, useState, useCallback } from "react";
import ProductItem from "../components/Product/ProductItem";
import ProductLoadButtons from "../components/Product/ProductLoadButtons";
import { PRODUCT_LINK } from "../components/constants";
import "../stylesheets/item.css";
import LoadingSpinner from "../components/Loading";
import AddProductForm from "../components/Product/AddProductForm"

const ShopNow = (props) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddProductForm = () => {
    showAddProduct? setShowAddProduct(false)
          : setShowAddProduct(true);
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
		props.setSectionName('Shop Now');
	}, [props]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
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
          loadPrevItems();
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
        showAddProduct? 
          <AddProductForm handleAddProductForm={handleAddProductForm}
            cookies={props.cookies}
            handleMessage={props.handleMessage}
          />
        : <>
        </>
      }
    <div className={`item ${showAddProduct? 'blur' : ''}`}>
      {loading ? (
        <LoadingSpinner/>
      ) : items.length > 0 ? (
        <div className="items">
          {items.map((item) => (
            <ProductItem userId={props.userId} role={props.role} item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div>
          <h3>No products to display</h3>
        </div>
      )}
      <ProductLoadButtons role={props.role} onPrevClick={loadPrevItems} 
        onNextClick={loadNextItems}
        handleAddProductForm={handleAddProductForm}/>
    </div>
    </>
  );
}

export default ShopNow;
