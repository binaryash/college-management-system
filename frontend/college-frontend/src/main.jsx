// /main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // Use React 18+ root API
import './App.css';  // Import your styles if you have any global styles
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Create root element using React 18's new root API
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
