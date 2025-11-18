import React, { useState, useEffect } from 'react';
import { Video, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const InterviewSetupPage = () => {
  const [selectedCamera, setSelectedCamera] = useState('Integrated Camera (5986:212b)');
  const [selectedMicrophone, setSelectedMicrophone] = useState('Headset (STORM) (Bluetooth)');
  const [selectedSpeaker, setSelectedSpeaker] = useState('Default - Headphones (STORM) (Bluetooth)');
  const [micLevel, setMicLevel] = useState(40);
  const navigate = useNavigate();

  // Simulate microphone level fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setMicLevel(Math.random() * 60 + 20);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const cameras = [
    'Integrated Camera (5986:212b)',
    'USB Camera',
    'External Webcam'
  ];

  const microphones = [
    'Headset (STORM) (Bluetooth)',
    'Built-in Microphone',
    'External Mic'
  ];

  const speakers = [
    'Default - Headphones (STORM) (Bluetooth)',
    'Built-in Speakers',
    'External Speakers'
  ];

  const handleTestSpeaker = () => {
    console.log('Testing speaker...');
    alert('Playing test sound...');
  };

  const handleClose = () => {
    navigate('/client-dashboard');
    console.log('Closing setup...');
  };

  const handleContinue = () => {
    navigate('/interview');
    console.log('Continuing to interview...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">Interview Setup</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Camera Preview */}
          <div className="mb-6">
            <div className="w-full h-64 bg-gray-400 rounded-lg flex items-center justify-center">
              <Video className="w-16 h-16 text-gray-300" />
            </div>
          </div>

          {/* Camera Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Camera
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              {cameras.map((camera) => (
                <option key={camera} value={camera}>
                  {camera}
                </option>
              ))}
            </select>
          </div>

          {/* Microphone Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Microphone
            </label>
            <select
              value={selectedMicrophone}
              onChange={(e) => setSelectedMicrophone(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer mb-3"
            >
              {microphones.map((mic) => (
                <option key={mic} value={mic}>
                  {mic}
                </option>
              ))}
            </select>

            {/* Mic Level Indicator */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                Mic Level
              </span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-200 rounded-full"
                  style={{ width: `${micLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Speaker Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Speaker
            </label>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer mb-3"
            >
              {speakers.map((speaker) => (
                <option key={speaker} value={speaker}>
                  {speaker}
                </option>
              ))}
            </select>

            {/* Test Speaker Button */}
            <button
              onClick={handleTestSpeaker}
              className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Test Speaker
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Close
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Desktop/Primary Label */}
      <div className="fixed top-4 left-4 text-xs text-gray-500 font-mono">
        Desktop · Primary
      </div>
    </div>
  );
};

export default InterviewSetupPage;