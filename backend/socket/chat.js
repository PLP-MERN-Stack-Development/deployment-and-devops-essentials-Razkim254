export const registerChatHandlers = (socket, io, users, messages) => {
  socket.on('send_message', (data, callback) => {
    const message = {
      ...data,
      id: Date.now(),
      senderId: socket.id,
      timestamp: new Date().toISOString(),
    };
    messages.push(message);
    if (messages.length > 100) messages.shift();
    io.emit('receive_message', message);
    if (callback) callback({ timestamp: message.timestamp });
  });

  socket.on('private_message', ({ to, message }, callback) => {
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
    if (callback) callback({ timestamp: messageData.timestamp });
  });
};
