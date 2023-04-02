function showAlert(message, success = false) {
  const alert = document.createElement('div');
  alert.textContent = message;
  alert.style.position = 'fixed';
  alert.style.bottom = '20px';
  alert.style.left = '20px';
  alert.style.padding = '20px';
  alert.style.backgroundColor = success ? 'green': '#8b0000';
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
