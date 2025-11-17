import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateShortlistWizard from './pages/CreateShortlistWizard';
import CandidateRankingPage from './pages/CandidateRankingPage';
import CandidateProfilePage from './pages/CandidateProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-shortlist" element={<CreateShortlistWizard />} />
        <Route path="/job/:jobId/candidates" element={<CandidateRankingPage />} />
        <Route path="/candidates/:candidateId/profile" element={<CandidateProfilePage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;