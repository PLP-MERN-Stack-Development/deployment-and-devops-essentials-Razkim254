module.exports = (socket, io) => {
  socket.on('file_upload', (data) => {
    io.emit('receive_file', data); // or io.to(data.room).emit(...) if room-based
  });
};
const path = require('path');

module.exports = (socket, io) => {
  socket.on('file_upload', (data) => {
    const { sender, fileName, fileData } = data;

    // Basic validation
    if (!sender || !fileName || !fileData) return;

    const fileExt = path.extname(fileName).toLowerCase();
    const allowedTypes = ['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.txt'];

    if (!allowedTypes.includes(fileExt)) {
      socket.emit('file_error', { message: 'Unsupported file type.' });
      return;
    }

    // Broadcast to all clients (or use io.to(room).emit for scoped sharing)
    io.emit('receive_file', {
      sender,
      fileName,
      fileData,
      timestamp: new Date().toISOString(),
    });
  });
};
