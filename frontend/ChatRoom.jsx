const sendPrivateMessage = (toUser, message) => {
  socket.emit('private_message', { to: toUser, message, sender: username });
};
const { unreadCount, setUnreadCount, isFocused } = useContext(ChatContext);

useEffect(() => {
  socket.on('receive_message', (data) => {
    setChat((prev) => [...prev, data]);
    if (!isFocused) setUnreadCount((prev) => prev + 1);
  });
}, []);
const [messages, setMessages] = useState([]);
const [page, setPage] = useState(0);

useEffect(() => {
  socket.emit('load_messages', { room: currentRoom, skip: page * 20 });
  socket.on('loaded_messages', (msgs) => {
    setMessages((prev) => [...msgs, ...prev]);
  });
}, [page]);
useEffect(() => {
  socket.on('connect_error', () => console.warn('Connection failed'));
  socket.on('reconnect', () => console.log('Reconnected'));
}, []);
