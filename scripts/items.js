const itemsSection = document.querySelector('.items');

let i = 0;

function createItemElement(item) {
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const a = document.createElement('a');

  h2.textContent = item.name;
  p1.textContent = item.description;
  p2.textContent = `${item.price}`;
  a.textContent = 'Add to Cart';
  a.setAttribute('href', `order_page.html?${item.id}`);
  a.onclick = function(event) {
    if (!isTokenValid()) {
      event.preventDefault();
      window.location.href = 'login.html';
    }
  };
  a.classList.add('btn');

  article.appendChild(h2);
  article.appendChild(p1);
  article.appendChild(p2);
  article.appendChild(a);
  article.classList.add('item');
  return article;
}

function getProducts(page, count) {
  fetch(`http://localhost:8080/api/v1/product/products?page=${page}&count=${count}`)
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
    if(i>0){
        i--;
        getProducts(i, 9);
        return;
    }

    showAlert("Previous items cannot be loaded. This is the first page");

  }
