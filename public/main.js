const socket = io();
const messages = document.querySelector('.messages');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const nameBlock = document.querySelector('.username');

const userName = prompt('Ваше имя:', 'Аноним');
nameBlock.innerHTML = `${userName}`;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('here');
  if (input.value) {
    socket.emit('chat message', {
      message: input.value,
      name: userName,
    });
    input.value = '';
  }
});

socket.on('chat message', (data) => {
  const item = document.createElement('div');
  item.classList.add('message');
  item.innerHTML = `<span>${data.name}</span>: ${data.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
