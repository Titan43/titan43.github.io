if (!isTokenValid()) {
  window.location.href = 'login.html';
}

const itemsSection = document.querySelector('.items');
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const userField = document.querySelector('#username');
  obtainUser(userField.value).then((data) => {
    const userBlock = buildUserBlock(data);
    userBlock.setAttribute('id', 'item-to-order');
    itemsSection.replaceChild(
        userBlock,
        document.querySelector('#item-to-order'));

    userField.value='';
  },
  ).catch((error) => {
    console.log(error);
  });
});
