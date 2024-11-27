// script.js

const socket = io();  // Connect to the Socket.IO server
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent page reload on form submission

  const userMessage = input.value;  // Get the message input

  // Add the message to the list of messages on the client side
  const li = document.createElement('li');
  li.textContent = `You: ${userMessage}`;
  messages.appendChild(li);

  // Send the message to the server
  socket.emit('chat message', userMessage);

  // Clear the input field
  input.value = '';
});

// Listen for new messages from the server (including other users' messages)
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = `Other: ${msg}`;
  messages.appendChild(li);
});

// Listen for the initial chat history from the server
socket.on('chat history', (history) => {
  history.forEach((msg) => {
    const li = document.createElement('li');
    li.textContent = `Other: ${msg}`;
    messages.appendChild(li);
  });
});
