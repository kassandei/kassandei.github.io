// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);  // Set up Socket.IO

// Store messages history
let messages = [];  // This will hold all the chat messages

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Handle connection event for each new client
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Send the current chat history to the new user
    socket.emit('chat history', messages);
    
    // Handle 'chat message' event from client
    socket.on('chat message', (msg) => {
        // Save the new message to the message history
        messages.push(msg);

        // Broadcast the message to all clients
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});