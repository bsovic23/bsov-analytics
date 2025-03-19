import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bsov Analytics
import BsovAnalyticsComponent from './pages/BsovAnalytics';

import DataBot from './pages/BsovAnalyticsPages/DataBot';
import NkfAnalyticsPage from './pages/BsovAnalyticsPages/NkfAnalytics';

import GoogleAnalyticsPage from './pages/BsovAnalyticsPages/GoogleAnalytics';
import GeniallyAnalyticsPage from './pages/BsovAnalyticsPages/GeniallyAnalytics';
import YouTubeAnalyticsPage from './pages/BsovAnalyticsPages/YouTubeAnalytics';
import CaseHippoAnalyticsPage from './pages/BsovAnalyticsPages/CaseHippoAnalytics';

// NKF Analytics V5.0 New
import NewPage from './pages/NkfAnalyticsPages/NewPage';

const routes = [
  {path: "/", element: <BsovAnalyticsComponent />},

  // Bsov Analytics
  {path: "/DataBot", element: <DataBot />},
  {path: "/NkfAnalyticsPage", element: <NkfAnalyticsPage />},

  {path: "/GoogleAnalyticsPage", element: <GoogleAnalyticsPage />},
  {path: "/GeniallyAnalyticsPage", element: <GeniallyAnalyticsPage />},
  {path: "/YouTubeAnalyticsPage", element: <YouTubeAnalyticsPage />},
  {path: "/CaseHippoAnalyticsPage", element: <CaseHippoAnalyticsPage />},

  // NKF Analytics V5.0 New
  {path: "/NewPage", element: <NewPage />},
];

function App() {
  return (
    <section class='app'>
        <header class='app-heading'>
          <h1>NKF ANALYTICS</h1>
          <p>Version 5.01.03</p>
        </header>
        <div>
            <body>
              <Router basename="/bsov-analytics">
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