import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage     from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/"          element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* Catch-all → back to login */}
      <Route path="*"          element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
