import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bsov Analytics
import BsovAnalyticsComponent from './pages/BsovAnalytics';

import DataBot from './pages/BsovAnalyticsPages/DataBot';
import NkfAnalyticsPage from './pages/BsovAnalyticsPages/NkfAnalytics';

import GoogleAnalyticsPage from './pages/BsovAnalyticsPages/GoogleAnalytics';

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
  {path: "/GoogleAnalyticsPage", element: <GoogleAnalyticsPage />},

  // NKF Analytics V5.0 New
  {path: "/CaseHippoAnalyticsPageNew", element: <CaseHippoAnalyticsPageNew />},
  {path: "/YouTube", element: <YouTube />},
  {path: "/Genially", element: <Genially />},
  {path: "/Google", element: <Google />},
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