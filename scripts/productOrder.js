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
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    h2.textContent = product.name;
    p1.textContent = product.description;
    p2.textContent = `${product.price}`;
  
    itemToOrder.appendChild(h2);
    itemToOrder.appendChild(p1);
    itemToOrder.appendChild(p2);

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