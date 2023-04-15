const itemsSection = document.querySelector('.items');

let i = 0;

function createItemElement(item) {
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  const p0 = document.createElement('p');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  const a = document.createElement('a');

  h2.textContent = item.name;
  p0.textContent = `Product Id: ${item.id}`;
  p1.textContent = `Description: ${item.description}`;
  p2.textContent = `Price: ${item.price}`;
  p3.textContent = `Available: ${item.quantity}`;
  a.classList.add('btn');

  if (item.quantity>0) {
    a.textContent = 'Add to Cart';
    a.setAttribute('href', `order_page.html?${item.id}`);
  } else {
    a.textContent = 'Out of Stock';
    a.setAttribute('href', '#');
    a.classList.add('remove');
  }
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

function getProducts(page, count) {
  fetch(`${PRODUCT_LINK}/products?page=${page}&count=${count}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length == 0) {
          showAlert('More items cannot be loaded currently');
          i--;
          return;
        }
        itemsSection.innerHTML = '';

        for (const item of data) {
          const itemElement = createItemElement(item);
          itemsSection.appendChild(itemElement);
        }
      }).catch((error) => console.error(error));
}

getProducts(i, 9);

function loadItems() {
  i++;
  getProducts(i, 9);
}

function loadPrevItems() {
  if (i>0) {
    i--;
    getProducts(i, 9);
    return;
  }

  showAlert('Previous items cannot be loaded. This is the first page');
}
