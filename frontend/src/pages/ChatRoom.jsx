import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useNotifications } from '../hooks/useNotifications';
import FileUpload from '../components/FileUpload';
import FilePreview from '../components/FilePreview';
import socket from '../socket/socket';

function ChatRoom() {
  const { username } = useContext(AuthContext);
  const { unreadCount, setUnreadCount, isFocused } = useContext(ChatContext);
  const { playSound, showBrowserNotification } = useNotifications();

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [systemMessages, setSystemMessages] = useState([]);

  useEffect(() => {
    socket.emit('join', username);

    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
      playSound();
      showBrowserNotification(data);
      if (!isFocused) setUnreadCount((prev) => prev + 1);
    });

    socket.on('user_typing', (user) => {
      setTyping(user !== username ? `${user} is typing...` : '');
    });

    socket.on('online_users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('receive_file', (data) => {
      setFiles((prev) => [...prev, data]);
    });

    socket.on('user_event', ({ type, username }) => {
      const msg = type === 'join' ? `${username} joined` : `${username} left`;
      setSystemMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [username, isFocused, playSound, showBrowserNotification, setUnreadCount]);

  useEffect(() => {
    if (isFocused) setUnreadCount(0);
  }, [isFocused]);

  const sendMessage = () => {
    const payload = {
      sender: username,
      message,
      timestamp: new Date().toISOString(),
    };
    socket.emit('send_message', payload);
    setMessage('');
  };

  const handleTyping = () => {
    socket.emit('typing', username);
  };

  return (
    <div className="chat-room">
      <h2>Global Chat</h2>
      <p>Online: {onlineUsers.join(', ')}</p>

      <div className="chat-messages">
        {systemMessages.map((msg, idx) => (
          <p key={`sys-${idx}`}><em>{msg}</em></p>
        ))}
        {chat.map((msg, idx) => (
          <p key={`chat-${idx}`}>
            <strong>{msg.sender}</strong>: {msg.message}
            <em> {new Date(msg.timestamp).toLocaleTimeString()}</em>
          </p>
        ))}
        {files.map((file, idx) => (
          <FilePreview key={`file-${idx}`} file={file} />
        ))}
      </div>

      <p>{typing}</p>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>

      <FileUpload />
    </div>
  );
}

export default ChatRoom;
