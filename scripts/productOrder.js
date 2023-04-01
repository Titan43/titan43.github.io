var queryString = location.search.substring(1);
var params = queryString.split("|"); 
var productId = params[0];

const orderForm = document.querySelector('form');

function loadProduct(id){
fetch(`http://localhost:8080/api/v1/product/${id}`)
  .then(response => response.json())
  .then(product => {
    const itemToOrder = document.getElementById('item-to-order');
    itemToOrder.innerHTML = "";

    const h2 = document.createElement('h2');
    const p0 = document.createElement('p');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
  
    h2.textContent = product.name;
    p0.textContent = `Product Id: ${product.id}`;
    p1.textContent = `Description: ${product.description}`;
    p2.textContent = `Price: ${product.price}`;
    p3.textContent = `Available: ${product.quantity}`
  
    itemToOrder.appendChild(h2);
    itemToOrder.appendChild(p0);
    itemToOrder.appendChild(p1);
    itemToOrder.appendChild(p2);
    itemToOrder.appendChild(p3);

}).catch(error => console.error(error));
}

loadProduct(productId);

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const quantity = document.getElementById('order-quantity').value;

    const cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
    const token = cookies.token;

    fetch(`http://localhost:8080/api/v1/order/orderProduct/${productId}?quantity=${quantity}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
            return response.text().then(error => {throw new Error(error)});
        }
        return response.text();
      })
      .then(data => {
        showAlert(data, true);
        orderForm.reset();
      })
      .catch(error => {
        showAlert(error.message)
      });
});