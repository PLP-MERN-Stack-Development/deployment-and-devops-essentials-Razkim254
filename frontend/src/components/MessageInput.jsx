import React, { useState } from 'react';
import socket from '../socket/socket'; // from client/src/socket/socket.js

const MessageInput = ({ username, room }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      room,
      message,
      sender: username,
    };

    socket.emit('send_message', messageData, (ack) => {
      console.log('Delivered at:', new Date(ack.timestamp).toLocaleTimeString());
    });

    setMessage('');
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};
const handleSendMessage = () => {
  const tempId = Date.now(); // temporary ID
  const messageData = {
    id: tempId,
    room,
    sender: username,
    message,
    status: 'pending',
  };

  setMessages((prev) => [...prev, messageData]);

  socket.emit('send_message', messageData, (ack) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === tempId ? { ...msg, status: 'delivered', timestamp: ack.timestamp } : msg
      )
    );
  });
  setMessage('');
};

export default MessageInput;
