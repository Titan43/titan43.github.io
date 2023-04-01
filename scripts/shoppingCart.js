const itemsSection = document.querySelector('.cart-items');
const totalElement = document.querySelector('.cart-total h3');
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
    a.classList.add('remove');
  
    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(a);
    article.classList.add('item');
    return article;
}

function hideButtons(){
    totalElement.textContent = 'You haven\'t ordered anything yet!';
    orderBtn.style.display = 'none';
    cancelOrderBtn.style.display = 'none';
}

function cancelOrder(){
    const cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
    fetch('http://localhost:8080/api/v1/order/cancel', {
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
        itemsSection.innerHTML="";
        hideButtons();
        showAlert(data, true);
    })
    .catch(error => {
        showAlert(error.message);
    });
}

function confirmOrder() {
    const cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
    fetch("http://localhost:8080/api/v1/order/confirm", {
      method: "GET",
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
        itemsSection.innerHTML="";
        hideButtons();
        showAlert(data, true);
    })
    .catch(error => {
        showAlert(error.message);
    });

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

        if(data.total_price == 0){
            hideButtons();
        }
        else{
            totalElement.textContent = `Total: ${data.total_price}`;
        }

        itemsSection.innerHTML="";
        for(const item of data.ordered_products){
            itemsSection.appendChild(createCartEntry(item));
        }

  }).catch(error => {
    if(error.message == "Theres no pending order to show(CODE 404)"){
        hideButtons();
    }
    else{
        showAlert(error.message);
    }
  });
  cookies = null;