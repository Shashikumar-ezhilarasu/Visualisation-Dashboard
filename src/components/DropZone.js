import React from 'react';

const DropZone = ({ onFileDrop }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      onFileDrop(files[0]); // Call the onFileDrop function with the first file
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior to allow dropping
  };

  const handleClick = () => {
    document.getElementById('fileInput').click(); // Trigger file input click
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      onFileDrop(files[0]); // Call the onFileDrop function with the selected file
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <p>Drag and drop a file here, or click to select one</p>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the file input
      />
    </div>
  );
};

export default DropZone;
