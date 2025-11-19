const fileController = require('../controllers/fileController');
const onlineUsers = new Set();

module.exports = (io) => {
  const chatNamespace = io.of('/chat');

  chatNamespace.on('connection', (socket) => {
    console.log(`🔌 Connected: ${socket.id}`);

    // Join room
    socket.on('join_room', (room) => {
      socket.join(room);
      socket.room = room;
      chatNamespace.to(room).emit('user_event', { type: 'join', username: socket.username });
    });

    // Join global
    socket.on('join', (username) => {
      socket.username = username;
      onlineUsers.add(username);
      chatNamespace.emit('user_event', { type: 'join', username });
      chatNamespace.emit('online_users', Array.from(onlineUsers));
    });

    // Global message
    socket.on('send_message', (data) => {
      chatNamespace.to(data.room || socket.room).emit('receive_message', data);
    });

    // Private message
    socket.on('private_message', ({ to, message, sender }) => {
      const targetSocket = [...chatNamespace.sockets.values()].find(s => s.username === to);
      if (targetSocket) {
        targetSocket.emit('receive_private_message', {
          sender,
          message,
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Typing indicator
    socket.on('typing', (username) => {
      socket.broadcast.to(socket.room).emit('user_typing', username);
    });

    // File upload
    fileController(socket, chatNamespace);

    // Disconnect
    socket.on('disconnect', () => {
      onlineUsers.delete(socket.username);
      chatNamespace.emit('user_event', { type: 'leave', username: socket.username });
      chatNamespace.emit('online_users', Array.from(onlineUsers));
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });
};
