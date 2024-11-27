// script.js

const socket = io();  // Connect to the Socket.IO server
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent page reload on form submission

  // Send the message to the server
  socket.emit('chat message', input.value);

  // Clear the input field
  input.value = '';
});

// Listen for new messages from the server
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
