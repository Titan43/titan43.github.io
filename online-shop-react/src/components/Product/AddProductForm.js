import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
import '../../stylesheets/form.css';
import { useState } from 'react';
import { CreateProduct } from './CreateProduct';

const AddProductForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    image: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    const roundedPrice = parseFloat(formData.price).toFixed(2);
  
    let updatedFormData = {
      ...formData,
      price: roundedPrice,
    };
    if (formData.image) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        updatedFormData = {
          ...updatedFormData,
          image: base64Image,
        };
        CreateProduct(updatedFormData, props.cookies, props.handleMessage, props.toggleEmpty);
      };
      reader.readAsDataURL(formData.image);
    } else {
      updatedFormData = {
        ...updatedFormData,
        image: null,
      };
      CreateProduct(updatedFormData, props.cookies, props.handleMessage, props.toggleEmpty);
    }
  }
  

  function handleInputChange(event) {
    const { name, value, type, files } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? files[0] : value,
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
        step={0.01}
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

      <label htmlFor="product-image">Product Image:</label>
      <input
        type="file"
        id="product-image"
        name="image"
        accept="image/*"
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
