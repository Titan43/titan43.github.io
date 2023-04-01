document.cookie = `token=; path=/`;
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  fetch('http://localhost:8080/api/v1/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      return response.text().then(error => {throw new Error(error)});
    }
  })
  .then(out => {
    login(data.username, data.password);
  })
  .catch(error => {
    showAlert(error.message)
  });
});