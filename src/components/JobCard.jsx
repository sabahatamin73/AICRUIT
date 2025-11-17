import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job, onOptionsClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job/${job.id}/candidates`);
  };

  const handleOptionsClick = (e) => {
    e.stopPropagation();
    onOptionsClick(job);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-green-600 font-medium">{job.position}</p>
          {job.candidatesCount !== undefined && (
            <p className="text-sm text-gray-500 mt-2">
              {job.candidatesCount} candidate{job.candidatesCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button
          onClick={handleOptionsClick}
          className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Options
        </button>
      </div>
    </div>
  );
};

export default JobCard;