import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiUrl, setApiUrl] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [apiData, setApiData] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:5000/upload', formData)
      .then((response) => setUploadMessage(response.data.message))
      .catch((error) => console.error('Error uploading file:', error));
  };

  const handleApiIntegration = () => {
    axios.post('http://localhost:5000/api-data', { apiUrl })
      .then((response) => setApiData(response.data))
      .catch((error) => console.error('Error fetching API data:', error));
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>

      {/* File Upload Section */}
      <h2>Upload Data</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadMessage && <p>{uploadMessage}</p>}

      {/* API Integration Section */}
      <h2>API Integration</h2>
      <input
        type="text"
        placeholder="Enter API URL"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
      />
      <button onClick={handleApiIntegration}>Fetch API Data</button>
      {apiData && <pre>{JSON.stringify(apiData, null, 2)}</pre>}
    </div>
  );
}

export default App;

