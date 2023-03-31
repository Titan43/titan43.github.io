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

document.cookie = `token=; path=/`;
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  fetch('http://localhost:8080/api/v1/auth/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((error) => {
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        document.cookie = `token=${data.token}; path=/`;
        console.log('success');
        window.location.href = 'home.html';
      })
      .catch((error) => {
        showAlert(error.message);
      });
});


