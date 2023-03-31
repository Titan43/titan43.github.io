const itemsSection = document.querySelector('.cart-items');
const orderBtn = document.querySelector('.cart-total #orderBtn');
const cancelOrderBtn = document.querySelector('.cart-total #cancelOrderBtn');

if (!isTokenValid()) {
    window.location.href = 'login.html';
}

function createCartEntry(item) {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const a = document.createElement('a');
  
    h2.textContent = item.productName;
    p1.textContent = `Quantity: ${item.quantity}`;
    p2.textContent = `Total cost: ${item.totalCost}`;
    a.textContent = 'Remove';
    a.onclick = function(event) {

      if (!isTokenValid()) {
        event.preventDefault();
        window.location.href = 'login.html';
      }
      const cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
      fetch(`http://localhost:8080/api/v1/order/removeOrdered/${item.productId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${cookies.token}`
            }
     })
    .then(response => {
        if (!response.ok) {
            return response.text().then(error => {throw new Error(error)});
        }
        return response.text();
    })
    .then(data => {
        window.location.reload();
    })
    .catch(error => {
        showAlert(error.message);
    });

    };
    a.classList.add('btn');
  
    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(a);
    article.classList.add('item');
    return article;
}

let cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
fetch('http://localhost:8080/api/v1/order/myOrder', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.token}`
    }
  })
  .then(response => {
    if (!response.ok) {
        return response.text().then(error => {throw new Error(error)});
    }
    return response.json();
  })
  .then(data => {

        const totalElement = document.querySelector('.cart-total h3');
        if(data.total_price == 0){
            totalElement.textContent = 'You haven\'t ordered anything yet!';
            orderBtn.style.display = 'none';
            cancelOrderBtn.style.display = 'none';
        }
        else{
            totalElement.textContent = `Total: ${data.total_price}`;
        }

        itemsSection.innerHTML="";
        for(const item of data.ordered_products){
            itemsSection.appendChild(createCartEntry(item));
        }

  }).catch(error => {
    showAlert(error.message);
  });
  cookies = null;
