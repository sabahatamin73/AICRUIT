import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateShortlistWizard from './pages/CreateShortlistWizard';
import CandidateRankingPage from './pages/CandidateRankingPage';
import CandidateProfilePage from './pages/CandidateProfilePage';
import CandidateDropCVPage from './pages/CandidateDropCVPage';
import ClientDashboard from './pages/ClientDashboard';
import InterviewGuidelinesPage from './pages/InterviewGuidelinesPage';
import InterviewSetupPage from './pages/InterviewSetupPage';
import InterviewScreen from './pages/InterviewScreen';
import InterviewEndPage from './pages/InterviewEndPage';
import ManageRecruitersPage from './pages/ManageRecruitersPage';

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
        <Route path="/candidate-drop-cv" element={<CandidateDropCVPage />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-interview-guidelines-page" element={<InterviewGuidelinesPage />} />
        <Route path="/interview-setup" element={<InterviewSetupPage />} />
        <Route path="/interview" element={<InterviewScreen />} />
        <Route path="/interview-end" element={<InterviewEndPage />} />
        <Route path="/manage-recruiters" element={<ManageRecruitersPage />} />


        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;