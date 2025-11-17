import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Button from '../components/Buttons';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="landing" />
      
      <main className="flex flex-col items-center justify-center px-8 py-24">
        <div className="max-w-4xl text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            AI-Cruit
          </h1>
          
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed">
            Conducts AI interviews with every candidate and shortlists only those who are a perfect match.
          </p>
          
          <Button 
            onClick={handleGetStarted}
            variant="primary"
            className="text-lg px-8 py-4"
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;