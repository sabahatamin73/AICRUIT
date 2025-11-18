import React from 'react';
import Button from '../components/Buttons';
import { useNavigate } from 'react-router-dom';

const InterviewEndPage = () => {
  const navigate = useNavigate();
  const handleDashboard = () => {
    // alert('Navigating to dashboard...');
    // Navigate to client dashboard
    navigate('/client-dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Thank You Message */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Thank you for completing the interview!
      </h1>

      {/* Dashboard Button */}
      <Button
        onClick={handleDashboard}
        className="px-12"
      >
        Dashboard
      </Button>
    </div>
  );
};

export default InterviewEndPage;