import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Bsov Analytics
import BsovAnalyticsComponent from './pages/BsovAnalytics';

import DataBot from './pages/BsovAnalyticsPages/DataBot';
import NkfAnalyticsPage from './pages/BsovAnalyticsPages/NkfAnalytics';

// NKF Analytics V5.0 New
import CaseHippoAnalyticsPageNew from './pages/NkfAnalyticsPages/CaseHippo'; 
import YouTube from './pages/NkfAnalyticsPages/Youtube';
import Genially from './pages/NkfAnalyticsPages/Genially';
import Google from './pages/NkfAnalyticsPages/Google';

const routes = [
  {path: "/", element: <BsovAnalyticsComponent />},

  // Bsov Analytics
  {path: "/DataBot", element: <DataBot />},
  {path: "/NkfAnalyticsPage", element: <NkfAnalyticsPage />},

  // NKF Analytics V5.0 New
  {path: "/CaseHippoAnalyticsPageNew", element: <CaseHippoAnalyticsPageNew />},
  {path: "/YouTube", element: <YouTube />},
  {path: "/Genially", element: <Genially />},
  {path: "/Google", element: <Google />},
];

function App() {
  return (
    <Router basename="/bsov-analytics">
      <section className="app">
        <header className="app-heading">
          <Link to="/">Home</Link>
          <h1>NKF ANALYTICS</h1>
          <p>Version 5.01.03</p>
        </header>

        <div className="app-content">
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </div>

        <footer className="app-footer">
          <div className="footer-left">
            <p>Brit Sovic</p>
          </div>
          <div className="footer-right">
            <p>National Kidney Foundation</p>
          </div>
        </footer>
      </section>
    </Router>
  );
}

export default App;