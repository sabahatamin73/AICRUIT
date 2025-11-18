import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ variant = 'default', onFeedback, onLogout }) => {
  const navigate = useNavigate();

  if (variant === 'landing') {
    return (
      <nav className="bg-black text-white px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">AI-Cruit</h1>
          <div className="flex gap-6">
            <button
              onClick={() => navigate('/login')}
              className="hover:text-gray-300 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="hover:text-gray-300 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    );
  }

  if (variant === 'dashboard' || variant ==='candidate-drop-cv') {
    return (
      <nav className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">AI-Cruit</h1>
          <div className="flex gap-6">
            <button
              onClick={onFeedback}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Feedback
            </button>
            <button
              onClick={onLogout}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Default navbar (for other pages)
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI-Cruit</h1>
      </div>
    </nav>
  );
};

export default Navbar;