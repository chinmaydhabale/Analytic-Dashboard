import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SalesOverTimePage from './pages/SalesOverTimePage';
import NewCustomersPage from './pages/NewCustomersPage';
import RepeatCustomersPage from './pages/RepeatCustomersPage';
import GeographicalDistributionPage from './pages/GeographicalDistributionPage';
import CLVByCohortsPage from './pages/CLVByCohortsPage';
import SGROverTime from './pages/SGROverTime';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sales-over-time" element={<SalesOverTimePage />} />
        <Route path="/sales-growth-rate-over-time" element={<SGROverTime />} />
        <Route path="/new-customers" element={<NewCustomersPage />} />
        <Route path="/repeat-customers" element={<RepeatCustomersPage />} />
        <Route path="/geographical-distribution" element={<GeographicalDistributionPage />} />
        <Route path="/clv-by-cohorts" element={<CLVByCohortsPage />} />
      </Routes>
    </>
  );
}

export default App;
