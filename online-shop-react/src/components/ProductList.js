import { useEffect, useState, useCallback } from "react";
import ProductItem from "./ProductItem";
import ProductLoadButtons from "./ProductLoadButtons";
import { PRODUCT_LINK } from "./constants";
import "../stylesheets/item.css";

function ProductList() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadPrevItems = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    else{
        console.log("No previous products to display");
    }
  }, [currentPage]);

  function loadNextItems() {
    setCurrentPage(currentPage + 1);
  }

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
          console.log("No products to display");  
          loadPrevItems();
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    obtainProducts(currentPage, 9);
  }, [currentPage, loadPrevItems]);

  return (
    <div className="item">
      {loading ? (
        <div>Loading...</div>
      ) : items.length > 0 ? (
        <div className="items">
          {items.map((item) => (
            <ProductItem item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div>
          <h3>No products to display</h3>
        </div>
      )}
      <ProductLoadButtons onPrevClick={loadPrevItems} 
        onNextClick={loadNextItems}/>
    </div>
  );
}

export default ProductList;
