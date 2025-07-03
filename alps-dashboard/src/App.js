import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './Route/MainRoute'; // Correct path

function App() {
  return (
    <Router>
      <MainRoute />
    </Router>
  );
}

export default App;
