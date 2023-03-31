function showAlert(message) {
  const alert = document.createElement('div');
  alert.textContent = message;
  alert.style.position = 'fixed';
  alert.style.bottom = '20px';
  alert.style.left = '20px';
  alert.style.padding = '20px';
  alert.style.backgroundColor = '#8b0000';
  alert.style.color = 'white';
  alert.style.borderRadius = '5px';
  alert.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
  alert.style.opacity = '0';
  alert.style.transition = 'opacity 0.3s ease-in-out';
  alert.style.animation = 'showAlertAnimation 0.3s ease-in-out forwards';
  document.body.appendChild(alert);

  const timer = document.createElement('div');
  timer.style.height = '5px';
  timer.style.backgroundColor = 'white';
  timer.style.borderRadius = '5px';
  timer.style.position = 'absolute';
  timer.style.bottom = '0';
  timer.style.left = '0';
  timer.style.width = '100%';
  alert.appendChild(timer);

  const intervalId = setInterval(() => {
    const remainingTime = parseFloat(timer.style.width) - 1;
    if (remainingTime < 0) {
      clearInterval(intervalId);
      alert.remove();
    } else {
      timer.style.width = `${remainingTime}%`;
    }
  }, 50);

  setTimeout(() => {
    alert.style.opacity = '1';
  }, 10);
}

const itemsSection = document.querySelector('.items');

let i = 0;

function createItemElement(item) {
  // Create the necessary HTML elements
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const a = document.createElement('a');

  // Set the text content and attributes of the elements
  h2.textContent = item.name;
  p1.textContent = item.description;
  p2.textContent = `${item.price}`;
  a.textContent = 'Add to Cart';
  a.setAttribute('href', 'order_page.html');
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
