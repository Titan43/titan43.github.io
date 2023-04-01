if (!isTokenValid()) {
    window.location.href = 'login.html';
}

const itemsSection = document.querySelector('.cart-items');

function updateUser(username, data) {
    let cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
    return fetch(`http://localhost:8080/api/v1/user?username=${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(error => {throw new Error(error)});
        }
        return;
    })
    .catch(error => {
        showAlert(error.message);
    });
  }

function updateUserForm(oUsername) {
    const form = document.createElement('form');
  
    const phoneLabel = document.createElement('label');
    phoneLabel.textContent = 'Phone Number:';
    const phoneInput = document.createElement('input');
    phoneInput.type = 'text';
    phoneInput.name = 'phoneNumber';
  
    const dobLabel = document.createElement('label');
    dobLabel.textContent = 'Date of Birth:';
    const dobInput = document.createElement('input');
    dobInput.type = 'date';
    dobInput.name = 'dob';
  
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
  
    const firstNameLabel = document.createElement('label');
    firstNameLabel.textContent = 'First Name:';
    const firstNameInput = document.createElement('input');
    firstNameInput.type = 'text';
    firstNameInput.name = 'fname';
  
    const surnameLabel = document.createElement('label');
    surnameLabel.textContent = 'Surname:';
    const surnameInput = document.createElement('input');
    surnameInput.type = 'text';
    surnameInput.name = 'sname';
  
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Update User';
    submitButton.type = 'submit';
    submitButton.classList.add('btn')
  
    form.appendChild(firstNameLabel);
    form.appendChild(firstNameInput);
  
    form.appendChild(surnameLabel);
    form.appendChild(surnameInput);

    form.appendChild(phoneLabel);
    form.appendChild(phoneInput);
  
    form.appendChild(dobLabel);
    form.appendChild(dobInput);
  
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
  
    form.appendChild(submitButton);
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const data = {
        phoneNumber: phoneInput.value,
        dob: dobInput.value,
        password: passwordInput.value,
        fname: firstNameInput.value,
        sname: surnameInput.value,
      };
  
      updateUser(oUsername, data)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          showAlert(error);
        });
    });

    return form;
  }

function deleteAccount(username){
    let cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));
    fetch(`http://localhost:8080/api/v1/user?username=${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.token}`
        }
      })
      .then(response => {
        if (!response.ok) {
            return response.text().then(error => {throw new Error(error)});
        }
        return;
    })
    .then(data =>{
        window.location.href='login.html';
    })
    .catch(error => {
        showAlert(error.message);
    });
}

function buildUserBlock(data){
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const p0 = document.createElement('p');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');

    h2.textContent = data.role;

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

    return article;
}

function obtainUser(username){
    let cookies = Object.fromEntries(document.cookie.split("; ").map(c => c.split("=")));   
    let url = 'http://localhost:8080/api/v1/user';
    if(username!=null){
        url+=`?username=${username}`
    }
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.token}`
        }})
    .then(response => {
        if (!response.ok) {
            return response.text().then(error => {throw new Error(error)});
        }
        return response.json();
    })
    .catch(error => {
        showAlert(error.message);
    });
}

obtainUser().then(data => {
    if(data.role != "VENDOR"){
        const  addProdButton = document.getElementById('addProd');
        const changeProdQButton = document.getElementById('changeProdQ');
        if(addProdButton && changeProdQButton){
            addProdButton.style.display = 'none';
            changeProdQButton.style.display = 'none';
        }
    }
    if(data.role != "MANAGER"){
        const  viewOrdersButton = document.getElementById('viewOrders');
        const viewUserButton = document.getElementById('viewUser');
    if(viewOrdersButton && viewUserButton){
        viewOrdersButton.style.display = 'none';
        viewUserButton.style.display = 'none';
        }
    }

    const deleteAccButton = document.getElementById('deleteAcc');
    const updateAccButton = document.getElementById('updateAcc');
    deleteAccButton.onclick = function(){
        deleteAccount(data.username);
    };

    updateAccButton.onclick = function(){
        itemsSection.insertBefore(updateUserForm(data.username), itemsSection.children[1]);
    }

    itemsSection.replaceChild(buildUserBlock(data), document.querySelector('#user'));
    }
).catch(error => {
    console.log(error);
});
