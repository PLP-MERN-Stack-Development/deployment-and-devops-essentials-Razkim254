function FilePreview({ file }) {
  const isImage = file.fileData.startsWith('data:image');

  return (
    <div>
      <p><strong>{file.sender}</strong> sent: {file.fileName}</p>
      {isImage ? (
        <img src={file.fileData} alt={file.fileName} style={{ maxWidth: '200px' }} />
      ) : (
        <a href={file.fileData} download={file.fileName}>Download</a>
      )}
    </div>
  );
}

export default FilePreview;
