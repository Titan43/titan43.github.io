function login(username, password){
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
      window.location.href = "home.html"
    })
    .catch(error => {
      showAlert(error.message)
    });
}