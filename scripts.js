const socket = io();

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
  const messageText = messageInput.value;
  if (messageText.trim() === '') return;

  socket.emit('chat message', messageText);
  messageInput.value = '';
}
