if (!isTokenValid()) {
    window.location.href = 'login.html';
}

const itemsSection = document.querySelector('.cart-items');

let role = '';
let cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
fetch('http://localhost:8080/api/v1/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.token}`
  }}).then(response => {
    if (!response.ok) {
        return response.text().then(error => {throw new Error(error)});
    }
    return response.json();
  }).then(data => {
    console.log(data);
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const p0 = document.createElement('p');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');


    h2.textContent = data.role;
    role = data.role;
    p0.textContent = `Name: ${data.fname+' '+data.sname}`;
    p1.textContent = `Email: ${data.email}`;
    p2.textContent = `Phone number: ${data.phoneNumber}`;
    p3.textContent = `Date of Birth: ${data.dob}`;

    article.appendChild(h2);
    article.appendChild(p0);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
    article.classList.add('item');

    itemsSection.insertBefore(article, itemsSection.firstChild);

  }).catch(error => {
    showAlert(error.message);
    console.log(error);
});
cookies = "";
