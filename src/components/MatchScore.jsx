import React from 'react';

const MatchScore = ({ score }) => {
  if (score === null || score === undefined) {
    return <span className="text-gray-400">-</span>;
  }

  const getScoreColor = (score) => {
    if (score >= 25) return { text: 'text-orange-600', bg: 'bg-blue-600' };
    if (score >= 15) return { text: 'text-orange-500', bg: 'bg-orange-500' };
    return { text: 'text-red-600', bg: 'bg-red-600' };
  };

  const colors = getScoreColor(score);

  return (
    <div className="w-32">
      <div className="flex items-center justify-between mb-1">
        <span className={`font-bold ${colors.text}`}>
          {score}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colors.bg}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default MatchScore;