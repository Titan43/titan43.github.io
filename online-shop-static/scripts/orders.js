if (!isTokenValid()) {
  window.location.href = 'login.html';
}

const itemsSection = document.querySelector('.cart-items');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let i = 0;

function hideButtons() {
  const message = document.createElement('h3');
  message.textContent = 'There are no orders yet!';
  message.classList.add('cart-total');
  itemsSection.appendChild(message);
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
}

function createItemElement(order) {
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  const p0 = document.createElement('p');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  const a = document.createElement('a');

  h2.textContent = `Order ID: ${order.id}`;
  p0.textContent = `Username: ${order.username}`;
  p1.textContent = `Total Cost: ${order.totalCost}`;
  p2.textContent = `Order Date: ${order.date}`;
  p3.textContent = `Confirmed: ${order.confirmed}`;
  a.classList.add('btn');
  a.textContent = 'View order';
  a.setAttribute('href', `order_view.html?${order.id}`);
  a.onclick = function(event) {
    if (!isTokenValid()) {
      event.preventDefault();
      window.location.href = 'login.html';
    }
  };

  article.appendChild(h2);
  article.appendChild(p0);
  article.appendChild(p1);
  article.appendChild(p2);
  article.appendChild(p3);
  article.appendChild(a);
  article.classList.add('item');
  return article;
}

function getOrders(page, count) {
  const cookies = Object.fromEntries(document.cookie.split('; ')
      .map((c) => c.split('=')));
  fetch(`${ORDER_LINK}/allOrders?page=${page}&count=${count}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.token}`,
    },
  })
      .then((response) => response.json())
      .then((data) => {
        if (data.length == 0) {
          if (i==0) {
            hideButtons();
          } else {
            i--;
            showAlert('More items cannot be loaded currently');
          }
          return;
        }
        itemsSection.innerHTML = '';

        for (const item of data) {
          const itemElement = createItemElement(item);
          itemsSection.appendChild(itemElement);
        }
      }).catch((error) => console.error(error));
}

getOrders(i, 9);

function loadItems() {
  i++;
  getOrders(i, 9);
}

function loadPrevItems() {
  if (i>0) {
    i--;
    getOrders(i, 9);
    return;
  }

  showAlert('Previous items cannot be loaded. This is the first page');
}

