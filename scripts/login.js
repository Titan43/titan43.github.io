document.cookie = `token=; path=/`;
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  fetch('http://localhost:8080/api/v1/auth/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then(error => {throw new Error(error)});
    }
  })
  .then(data => {
    document.cookie = `token=${data.token}; path=/`;
    console.log('success');
    window.location.href = "home.html"
  })
  .catch(error => {
    showAlert(error.message)
  });
});