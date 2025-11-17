import React, { useState } from 'react';

const ExperienceList = ({ experience, experienceText, isParsing }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isParsing) {
    return <p className="text-green-600 font-medium">{experienceText}</p>;
  }

  if (!experience || experience.length === 0) {
    return <p className="text-gray-500">{experienceText || 'No relevant experience'}</p>;
  }

  return (
    <div>
      <div className="mb-1">
        <p className="font-medium text-gray-900">{experience[0].title}</p>
        <p className="text-sm text-gray-500">
          {experience[0].company} • {experience[0].duration}
        </p>
      </div>

      {experience.length > 1 && (
        <>
          {isExpanded && (
            <div className="mt-2 space-y-2">
              {experience.slice(1).map((exp, idx) => (
                <div key={idx}>
                  <p className="font-medium text-gray-900">{exp.title}</p>
                  <p className="text-sm text-gray-500">
                    {exp.company} • {exp.duration}
                  </p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-700 mt-1"
          >
            {isExpanded 
              ? `- ${experience.length - 1} less`
              : `+ ${experience.length - 1} more`
            }
          </button>
        </>
      )}
    </div>
  );
};

export default ExperienceList;