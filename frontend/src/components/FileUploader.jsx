const handleFileUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    socket.emit('file_upload', {
      sender: username,
      fileName: file.name,
      fileData: reader.result,
    });
  };
  reader.readAsDataURL(file);
};
import { useState, useContext } from 'react';
import socket from '../socket/socket';
import { AuthContext } from '../context/AuthContext';

function FileUpload() {
  const { username } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      socket.emit('file_upload', {
        sender: username,
        fileName: file.name,
        fileData: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Send File</button>
    </div>
  );
}

export default FileUpload;
