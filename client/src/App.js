import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports
import Home from '../src/pages/Home';

function App() {
  return (
    <section class='app'>
        APPLICATION
        <div>
          <Home />
        </div>
    </section>
  );
}

export default App;