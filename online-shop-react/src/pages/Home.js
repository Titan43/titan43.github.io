import { useEffect, useState, useCallback } from "react";
import ProductItem from "../components/ProductItem";
import ProductLoadButtons from "../components/ProductLoadButtons";
import { PRODUCT_LINK } from "../components/constants";
import "../stylesheets/item.css";

const Home = (props) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

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
		props.setSectionName('Home');
	}, [props]);

  useEffect(() => {
    async function obtainProducts(page, count) {
      try {
        const response = await fetch(
          `${PRODUCT_LINK}/products?page=${page}&count=${count}`
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
    }
    obtainProducts(currentPage, 9);
  }, [currentPage, loadPrevItems, props]);

  return (
    <div className="item">
      {loading ? (
        <div>Loading...</div>
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
        onNextClick={loadNextItems}/>
    </div>
  );
}

export default Home;
