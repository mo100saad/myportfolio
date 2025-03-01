import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then(response => response.json()) // Convert to JSON
      .then(data => {
        console.log("Backend response:", data);
        setMessage(data.message); // Access JSON "message" field
      })
      .catch(error => {
        console.error("Error fetching backend data:", error);
        setMessage("Error loading data. Check console.");
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
