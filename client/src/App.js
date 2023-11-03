import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports
import Home from '../src/pages/Home';
import DataDictionary from './pages/DataDictionary';
import Registry from './pages/Registry';
import Klc from './pages/KLC';
import CKD from './pages/CKD';
import GeneralAnalysis from './pages/GeneralAnalysis';

const routes = [
  {path: "/", element: <Home />},
  {path: "/DataDictionary", element: <DataDictionary />},
  {path: "/Registry", element: <Registry />},
  {path: "/Klc", element: <Klc />},
  {path: "/Ckd", element: <CKD />},
  {path: "/GeneralAnalysis", element: <GeneralAnalysis />}
];

function App() {
  return (
    <section class='app'>
        <div class='app-heading'>
          <h1>BSOV ANALYTICS</h1>
          <p>Version 1.01</p>
        </div>
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