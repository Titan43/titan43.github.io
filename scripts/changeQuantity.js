if (!isTokenValid()) {
  window.location.href = 'login.html';
}

const orderForm = document.getElementById('order-form');

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const cookies = Object.fromEntries(document.cookie.split('; ')
      .map((c) => c.split('=')));
  const productId = document.getElementById('prod-id').value;
  const changeQuantityBy = document.getElementById('change-quantity').value;

  const payload = JSON.stringify({changeQuantityBy: changeQuantityBy});

  fetch(`${PRODUCT_LINK}/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.token}`,
    },
    body: payload,
  })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.text().then((error) => {
            throw new Error(error);
          });
        }
      })
      .then((out) => {
        showAlert(out, true);
        document.getElementById('prod-id').value = '';
        document.getElementById('change-quantity').value = '';
      })
      .catch((error) => {
        showAlert(error.message);
      });
});
