if(!isTokenValid()){
	window.location.href = 'login.html'
}

var queryString = location.search.substring(1);
var params = queryString.split("|"); 
var orderId = params[0];

function loadOrder(id) {
    let cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
    const token = cookies.token;
  
    fetch(`http://localhost:8080/api/v1/order/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(order => {
        const itemToOrder = document.getElementById('item-to-order');
        itemToOrder.innerHTML = "";
    
        const cont = document.createElement('div')
        cont.classList.add('item');
        const cont2 = document.createElement('div')
        cont2.classList.add('item');

        const h2 = document.createElement('h2');
        const p0 = document.createElement('p');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('h2');
        const p4 = document.createElement('p');
    
        h2.textContent = "Order";
        p0.textContent = `Order Date: ${order.date}`;
        p1.textContent = `Order Owner: ${order.order_owner}`;
        p2.textContent = `Total Price: ${order.total_price}`;
        p3.textContent = "Ordered Products:";
        p4.textContent = `Confirmed: ${order.confirmed}`;
    
        const productList = document.createElement('ul');
        order.ordered_products.forEach(product => {
          const li = document.createElement('li');
          li.classList.add('item');
          const pName = document.createElement('p');
          const pId = document.createElement('p');
          const pQty = document.createElement('p');
          const pCost = document.createElement('p');
    
          pName.textContent = `Product Name: ${product.productName}`;
          pId.textContent = `Product Id: ${product.productId}`;
          pQty.textContent = `Quantity: ${product.quantity}`;
          pCost.textContent = `Total Cost: ${product.totalCost}`;
    
          li.appendChild(pName);
          li.appendChild(pId);
          li.appendChild(pQty);
          li.appendChild(pCost);
    
          productList.appendChild(li);
        });
    
        cont.appendChild(h2);
        cont.appendChild(p0);
        cont.appendChild(p1);
        cont.appendChild(p2);
        cont.appendChild(p4);
        cont2.appendChild(p3);
        cont2.appendChild(productList);
        itemToOrder.appendChild(cont);
        itemToOrder.appendChild(cont2);
      })
      .catch(error => console.error(error));
  }

  loadOrder(orderId);