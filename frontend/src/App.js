import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [dbStatus, setDbStatus] = useState('Checking DB...');

  useEffect(() => {
    // Call the Backend API
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => setMessage(`Error: ${err.message}`));

    fetch('http://localhost:5000/health')
      .then(res => res.json())
      .then(data => setDbStatus(data.status))
      .catch(err => setDbStatus('DB Check Failed'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DevOps Master Project</h1>
        <p>Backend Status: <strong>{message}</strong></p>
        <p>Database Status: <strong>{dbStatus}</strong></p>
      </header>
    </div>
  );
}

export default App;