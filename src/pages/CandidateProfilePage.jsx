import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar, ResumeScoreCard, InfoCard } from '../components';
import { candidateService } from '../services/CandidateService';

const CandidateProfilePage = () => {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCandidateProfile();
  }, [candidateId]);

  const loadCandidateProfile = async () => {
    try {
      setIsLoading(true);
      const data = await candidateService.getCandidateProfile(candidateId);
      setCandidate(data);
    } catch (error) {
      console.error('Failed to load candidate profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCV = () => {
    // TODO: Open CV in new tab or modal
    if (candidate?.cv?.url) {
      window.open(candidate.cv.url, '_blank');
    } else {
      alert('CV not available');
    }
  };

  const handleViewResumeEvaluation = () => {
    // TODO: Open resume evaluation report
    if (candidate?.resumeEvaluation?.url) {
      window.open(candidate.resumeEvaluation.url, '_blank');
    } else {
      alert('Resume evaluation not available');
    }
  };

  const handleViewAIInterviewInfo = () => {
    // TODO: Navigate to AI interview details or open report
    if (candidate?.aiInterview?.report) {
      window.open(candidate.aiInterview.report, '_blank');
    } else {
      alert('AI interview information not available yet');
    }
  };

  const handleAccept = async () => {
    const confirmed = window.confirm(`Are you sure you want to accept ${candidate.name}?`);
    if (confirmed) {
      try {
        await candidateService.acceptCandidate(candidateId);
        alert('Candidate accepted successfully!');
        navigate(-1); // Go back to previous page
      } catch (error) {
        console.error('Failed to accept candidate:', error);
        alert('Failed to accept candidate');
      }
    }
  };

  const handleReject = async () => {
    const confirmed = window.confirm(`Are you sure you want to reject ${candidate.name}?`);
    if (confirmed) {
      try {
        await candidateService.rejectCandidate(candidateId);
        alert('Candidate rejected successfully!');
        navigate(-1); // Go back to previous page
      } catch (error) {
        console.error('Failed to reject candidate:', error);
        alert('Failed to reject candidate');
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading candidate profile...</div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Candidate not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Name and Action Buttons */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">{candidate.name}</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleAccept}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Reject
            </button>
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard 
            title="CV & Profile"
            onClick={handleViewCV}
          />
          <InfoCard 
            title="Resume Evaluation Report"
            onClick={handleViewResumeEvaluation}
          />
          <InfoCard 
            title="AI Interview Info"
            onClick={handleViewAIInterviewInfo}
          />
        </div>

        {/* Resume Score Table */}
        <ResumeScoreCard scores={candidate.resumeScore} />

        {/* Back Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleBack}
            className="px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;