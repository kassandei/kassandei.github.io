// Import the Server class from socket.io
const { Server } = require("socket.io");

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket.io already initialized");
    return res.status(200).send("Socket.io is already running.");
  }

  // Initialize Socket.io
  const io = new Server(res.socket.server);
  
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for chat messages and broadcast them
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  // Attach the Socket.io server to the Vercel serverless function
  res.socket.server.io = io;
  res.status(200).send("Socket.io initialized.");
}