import React from 'react';

const CandidateAvatar = ({ initials, name, email }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-semibold text-gray-700">
        {initials}
      </div>
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default CandidateAvatar;