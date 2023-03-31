function isTokenValid() {
  const cookies = Object.fromEntries(document.cookie.split('; ')
      .map((c) => c.split('=')));
  const token = cookies.token;
  return token && getExpirationTime(token)>new Date();
}

function getExpirationTime(jwt) {
  const payload = JSON.parse(atob(jwt.split('.')[1]));
  return new Date(payload.exp * 1000);
}

if (isTokenValid()) {
  document.getElementById('login-btn').style.display = 'none';
  document.getElementById('register-btn').style.display = 'none';
} else {
  document.getElementById('logout-btn').style.display = 'none';
}
