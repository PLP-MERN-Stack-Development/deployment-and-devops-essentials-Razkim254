import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [input, setInput] = useState('');
  const { setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (input.trim()) {
      setUsername(input.trim());
      navigate('/chat');
    }
  };

  return (
    <div>
      <h2>Enter Username</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleLogin}>Join Chat</button>
    </div>
  );
}

export default Login;
