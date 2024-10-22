import React, { useState } from 'react';
import axios from 'axios';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import DropZone from './components/DropZone'; // Import DropZone component
import Papa from 'papaparse'; // For CSV parsing
import * as XLSX from 'xlsx'; // For Excel parsing

function App() {
  const [chartData, setChartData] = useState({});

  const handleApiIntegration = () => {
    axios.get('http://localhost:5000/api-data')
      .then((response) => {
        const fetchedData = response.data;
        const formattedChartData = {
          labels: Object.keys(fetchedData),
          datasets: [
            {
              label: 'Data from API',
              data: Object.values(fetchedData),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
              ],
            },
          ],
        };
        setChartData(formattedChartData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleFileDrop = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      const fileType = file.name.split('.').pop().toLowerCase();

      if (fileType === 'csv') {
        // Parse CSV using PapaParse
        Papa.parse(fileContent, {
          header: true,
          complete: (results) => {
            console.log('Parsed CSV:', results.data);
            // Convert parsed CSV data to chartData format
            const labels = results.data.map(row => row.label); // Adjust according to your CSV structure
            const data = results.data.map(row => row.value); // Adjust according to your CSV structure
            setChartData({
              labels,
              datasets: [{
                label: 'CSV Data',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              }],
            });
          },
        });
      } else if (fileType === 'json') {
        const jsonData = JSON.parse(fileContent);
        console.log('JSON Data:', jsonData);
        // Process JSON and convert to chartData format
        const labels = Object.keys(jsonData);
        const data = Object.values(jsonData);
        setChartData({
          labels,
          datasets: [{
            label: 'JSON Data',
            data,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          }],
        });
      } else if (fileType === 'xlsx' || fileType === 'xls') {
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        console.log('Excel Data:', jsonData);
        // Convert Excel data to chartData format
        const labels = jsonData.map(row => row.label); // Adjust according to your Excel structure
        const data = jsonData.map(row => row.value); // Adjust according to your Excel structure
        setChartData({
          labels,
          datasets: [{
            label: 'Excel Data',
            data,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
          }],
        });
      } else {
        alert('Unsupported file type!');
      }
    };

    // Determine how to read the file based on its type
    if (file.type === 'text/csv') {
      reader.readAsText(file);
    } else if (file.type === 'application/json') {
      reader.readAsText(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
      reader.readAsBinaryString(file); // For Excel files
    } else {
      alert('Unsupported file type!');
    }
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <DropZone onFileDrop={handleFileDrop} />
      <button onClick={handleApiIntegration}>Fetch Data</button>

      {/* Displaying different charts */}
      {chartData.labels ? (
        <>
          <LineChart chartData={chartData} />
          <BarChart chartData={chartData} />
          <PieChart chartData={chartData} />
        </>
      ) : (
        <p>No data available. Click "Fetch Data" to load data.</p>
      )}
    </div>
  );
}

export default App;
