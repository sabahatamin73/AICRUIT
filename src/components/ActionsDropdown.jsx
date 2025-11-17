import React from 'react';
import { ChevronDown } from 'lucide-react';

const ActionsDropdown = ({ 
  candidateId, 
  isOpen, 
  onToggle, 
  onAIInterview, 
  onHumanInterview, 
  onViewProfile, 
  onReject 
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <span>Actions</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-56 z-10">
          <button 
            className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
            onClick={() => {
              onAIInterview(candidateId);
              onToggle();
            }}
          >
            Invite for AI interview
          </button>
          <button 
            className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
            onClick={() => {
              onHumanInterview(candidateId);
              onToggle();
            }}
          >
            Invite for human interview
          </button>
          <button 
            className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
            onClick={() => {
              onViewProfile(candidateId);
              onToggle();
            }}
          >
            View profile
          </button>
          <button 
            className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600"
            onClick={() => {
              onReject(candidateId);
              onToggle();
            }}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdown;