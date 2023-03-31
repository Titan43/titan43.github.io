const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

const token = document.cookie.split(';').some((c) => c.trim().startsWith('token='));
if (token) {
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('register-btn').style.display = 'none';
}