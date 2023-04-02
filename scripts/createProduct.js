const form = document.querySelector('form');

if (!isTokenValid()) {
  window.location.href = 'login.html';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const cookies = Object.fromEntries(document.cookie.split('; ')
      .map((c) => c.split('=')));

  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const quantity = document.getElementById('product-quantity').value;
  const description = document.getElementById('product-description').value;

  fetch(PRODUCT_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.token}`,
    },
    body: JSON.stringify({
      name: name,
      price: price,
      quantity: quantity,
      description: description,
    }),
  })
      .then((response) => {
        if (response.ok) {
          response.text().then((text) => {
            showAlert(text, true);
            document.getElementById('product-name').value = '';
            document.getElementById('product-price').value = '';
            document.getElementById('product-quantity').value = '';
            document.getElementById('product-description').value = '';
          });
        } else {
          return response.text().then((error) => {
            throw new Error(error);
          });
        }
      })
      .catch((error) => {
        showAlert(error.message);
      });
});
