// Connect to Socket.io using the Vercel serverless WebSocket function
const socket = io({
  transports: ["websocket"], // Force WebSocket transport
  path: "/api/websocket",    // Path for the WebSocket serverless function
});

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chat message', message);  // Send message to server
    messageInput.value = '';
  }
});

socket.on('chat message', (msg) => {
  const newMessage = document.createElement('div');
  newMessage.textContent = msg;
  messages.appendChild(newMessage);
  messages.scrollTop = messages.scrollHeight;  // Scroll to the latest message
});
