// server.js - Main server file for Socket.io chat application

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// ✅ MongoDB connection
import connectDB from './config/db.js';
connectDB();


// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users and messages
const users = {};
const messages = [];
const typingUsers = {};

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // ✅ Join room
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  // ✅ Room message
  socket.on('room_message', ({ room, message, sender }) => {
    const timestamp = new Date().toISOString();
    io.to(room).emit('receive_room_message', { sender, message, timestamp });
  });

  // ✅ Room typing indicator
  socket.on('typing', ({ room, username }) => {
    socket.to(room).emit('user_typing', username);
  });

  // ✅ Global message with ack
  socket.on('send_message', (data, callback) => {
    const message = {
      ...data,
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
    };

    messages.push(message);
    if (messages.length > 100) messages.shift();

    if (data.room) {
      io.to(data.room).emit('receive_message', message);
    } else {
      io.emit('receive_message', message);
    }

    if (callback) callback({ status: 'delivered', timestamp: message.timestamp });
  });

  // ✅ User joins
  socket.on('user_join', (username) => {
    users[socket.id] = { username, id: socket.id };
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    console.log(`${username} joined the chat`);
  });

  // ✅ Global typing indicator
  socket.on('typing_global', (isTyping) => {
    const username = users[socket.id]?.username;
    if (!username) return;

    if (isTyping) {
      typingUsers[socket.id] = username;
    } else {
      delete typingUsers[socket.id];
    }

    io.emit('typing_users', Object.values(typingUsers));
  });

  // ✅ Private message
  socket.on('private_message', ({ to, message }) => {
    const messageData = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };

    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
  });

  // ✅ Disconnect
  socket.on('disconnect', () => {
    const username = users[socket.id]?.username;
    if (username) {
      io.emit('user_left', { username, id: socket.id });
      console.log(`${username} left the chat`);
    }

    delete users[socket.id];
    delete typingUsers[socket.id];

    io.emit('user_list', Object.values(users));
    io.emit('typing_users', Object.values(typingUsers));
  });
});

// ✅ REST API routes
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
