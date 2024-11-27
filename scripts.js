const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

function sendMessage() {
  const messageText = messageInput.value;
  if (messageText.trim() === '') return;

  const messageElement = document.createElement('div');
  messageElement.textContent = messageText;
  chatBox.appendChild(messageElement);

  messageInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}
