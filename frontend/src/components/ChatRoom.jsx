useEffect(() => {
  socket.on('receive_message', (data) => {
    setChat((prev) => [...prev, data]);
    playNotificationSound();
    showBrowserNotification(data);
  });
}, []);

const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3'); // Place in public/
  audio.play();
};

const showBrowserNotification = ({ sender, message }) => {
  if (Notification.permission === 'granted') {
    new Notification(`New message from ${sender}`, { body: message });
  }
};
