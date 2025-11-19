const MessageBubble = ({ message }) => {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="message-bubble">
      <strong>{message.sender}</strong>: {message.message}
      <div className="meta">
        <span className="timestamp">🕒 {time}</span>
        {message.status === 'delivered' && <span className="status">✅ Delivered</span>}
      </div>
    </div>
  );
};
