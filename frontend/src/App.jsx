import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext'; // ✅ import this
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ChatProvider> {/* ✅ wrap your app here */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<ChatRoom />} />
          </Routes>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
