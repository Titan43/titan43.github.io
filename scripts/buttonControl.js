function isTokenValid(){
    const cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
    const token = cookies.token;
    return token && getExpirationTime(token)>new Date();
}

function getExpirationTime(jwt) {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    return new Date(payload.exp * 1000);
}

if (isTokenValid()) {
    const loginButton = document.getElementById('login-btn');
    const registerButton = document.getElementById('register-btn');
    if(loginButton && registerButton){
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
    }
}
else{
    const logoutButton = document.getElementById('logout-btn');
    if(logoutButton) logoutButton.style.display = 'none';
}