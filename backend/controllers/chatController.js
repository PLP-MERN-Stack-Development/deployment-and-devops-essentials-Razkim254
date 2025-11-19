const Message = require('../models/Message');

module.exports = (socket, io) => {
  socket.on('load_messages', async ({ room, skip = 0, limit = 20 }) => {
    const messages = await Message.find({ room })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);
    socket.emit('loaded_messages', messages.reverse());
  });

  socket.on('send_message', async (data) => {
    const msg = await Message.create(data);
    io.to(data.room).emit('receive_message', msg);
  });
};
