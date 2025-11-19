export const useNotifications = () => {
  const playSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  const showBrowserNotification = ({ sender, message }) => {
    if (Notification.permission === 'granted') {
      new Notification(`New message from ${sender}`, { body: message });
    }
  };

  return { playSound, showBrowserNotification };
};
