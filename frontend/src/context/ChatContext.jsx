import { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <ChatContext.Provider value={{ unreadCount, setUnreadCount, isFocused }}>
      {children}
    </ChatContext.Provider>
  );
};
