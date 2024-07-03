import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports
import Home from '../src/pages/Home';
import DataDictionary from './pages/DataDictionary';
import Registry from './pages/Registry';
import GeneralAnalysis from './pages/GeneralAnalysis';
import Survey from './pages/Survey';
import Salesforce from './pages/Salesforce';
import Affinia from './pages/Affinia';
import Ce from './pages/CE';
import Pam from './pages/Pam';
import TxTransplant from './pages/TxTransplant';
import Membership from './pages/Membership';

const routes = [
  {path: "/", element: <Home />},
  {path: "/DataDictionary", element: <DataDictionary />},
  {path: "/Registry", element: <Registry />},
  {path: "/GeneralAnalysis", element: <GeneralAnalysis />},
  {path: "/Survey", element: <Survey />},
  {path: "/Salesforce", element: <Salesforce />},
  {path: "/Affinia", element: <Affinia />},
  {path: "/Ce", element: <Ce />},
  {path: "/Pam", element: <Pam />},
  {path: "/TxTransplant", element: <TxTransplant />},
  {path: "/Membership", element: <Membership />},
];

function App() {
  return (
    <section class='app'>
        <header class='app-heading'>
          <h1>BSOV ANALYTICS</h1>
          <p>Version 2.01.01</p>
        </header>
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
        <footer class='app-footer'>
            Footer Created Here
        </footer>
    </section>
  );
}

export default App;