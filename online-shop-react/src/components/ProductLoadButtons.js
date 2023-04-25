import '../stylesheets/headers.css';
import '../stylesheets/button.css';

function ProductLoadButtons({role, onPrevClick, onNextClick}) {
    return (
      <div className="button-container">
        <button className="btn load-items" onClick={onPrevClick}>
          Load previous items
        </button>
        {role==='VENDOR'?
        <button className="btn load-items">
          Add product
        </button>:<></>}
        <button className="btn load-items" onClick={onNextClick}>
          Load more
        </button>
      </div>
    );
  }
  
export default ProductLoadButtons;