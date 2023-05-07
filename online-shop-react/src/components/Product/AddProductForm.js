import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
import '../../stylesheets/form.css';
import { useState } from 'react';

function AddProductForm(props) {
  const [formData, setFormData] = useState({
    description: '',
    quantity: '',
    price: '',
    name: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className='popup'>
      <label htmlFor="product-name">Product Name:</label>
      <input
        type="text"
        id="product-name"
        name="name"
        required
        value={formData.name}
        onChange={handleInputChange}
      />

      <label htmlFor="product-price">Product Price:</label>
      <input
        type="number"
        id="product-price"
        name="price"
        required
        value={formData.price}
        onChange={handleInputChange}
      />

      <label htmlFor="product-quantity">Product Quantity:</label>
      <input
        type="number"
        id="product-quantity"
        name="quantity"
        required
        value={formData.quantity}
        onChange={handleInputChange}
      />

      <label htmlFor="product-description">Product Description:</label>
      <textarea
        id="product-description"
        name="description"
        required
        value={formData.description}
        onChange={handleInputChange}
      />

      <button type="submit" className="btn">
        Add Product
      </button>

      <button
        type="button"
        className="btn remove"
        onClick={props.handleAddProductForm}
      >
        Cancel
      </button>
    </form>
  );
}

export default AddProductForm;
