import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports
import Home from '../src/pages/Home';
import DataDictionary from './pages/DataDictionary';

const routes = [
  {path: "/bsov-analytics", element: <Home />},
  {path: "/DataDictionary", element: <DataDictionary />},
]

function App() {
  return (
    <section class='app'>
        <h1>BSOV ANALYTICS</h1>
        <div>
            <body>
              <Router>
                <Routes>
                  {routes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              </Router>
            </body>
        </div>
    </section>
  );
}

export default App;