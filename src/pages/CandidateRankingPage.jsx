import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import {
  Navbar,
  RankBadge,
  CandidateAvatar,
  ExperienceList,
  MatchScore,
  RequirementMatch,
  StatusBadge,
  ActionsDropdown,
  InterviewStatsCard
} from '../components';
import { candidateService } from '../services/CandidateService';

const CandidateRankingPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCandidateData();
  }, [jobId]);

  const loadCandidateData = async () => {
    try {
      setIsLoading(true);
      const data = await candidateService.getCandidateRanking(jobId);
      setJobData(data);
    } catch (error) {
      console.error('Failed to load candidate data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIInterview = async (candidateId) => {
    try {
      await candidateService.inviteForAIInterview(candidateId);
      // Optionally refresh data or show success message
      alert('AI interview invitation sent successfully!');
    } catch (error) {
      console.error('Failed to send AI interview invite:', error);
      alert('Failed to send invitation. Please try again.');
    }
  };

  const handleHumanInterview = async (candidateId) => {
    try {
      await candidateService.inviteForHumanInterview(candidateId);
      alert('Human interview invitation sent successfully!');
    } catch (error) {
      console.error('Failed to send human interview invite:', error);
      alert('Failed to send invitation. Please try again.');
    }
  };

  const handleViewProfile = (candidateId) => {
    // Navigate to candidate profile page (to be created)
    navigate(`/candidates/${candidateId}/profile`);
  };

  const handleReject = async (candidateId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to reject this candidate?');
      if (confirmed) {
        await candidateService.rejectCandidate(candidateId);
        alert('Candidate rejected successfully!');
        // Optionally refresh data
        await loadCandidateData();
      }
    } catch (error) {
      console.error('Failed to reject candidate:', error);
      alert('Failed to reject candidate. Please try again.');
    }
  };

  const filteredCandidates = jobData?.candidates?.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading candidate data...</div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Failed to load data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back To Dashboard</span>
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {jobData.job.title}
              </h2>
              <p className="text-gray-500">Candidate Ranking And Evaluation</p>
            </div>
            <div className="flex flex-col gap-3">
              <button className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Add Hiring Assistants
              </button>
              <button className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Add More Candidates
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <InterviewStatsCard 
            type="totalCandidates"
            value={jobData.stats.totalCandidates}
          />
          <InterviewStatsCard 
            type="invitesSent"
            value={jobData.stats.interviewInvitesSent}
          />
          <InterviewStatsCard 
            type="scheduled"
            value={jobData.stats.interviewsScheduled}
          />
          <InterviewStatsCard 
            type="pending"
            value={jobData.stats.interviewsPending}
          />
          <InterviewStatsCard 
            type="completed"
            value={jobData.stats.interviewsCompleted}
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Candidate Ranking Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Candidate ranking</h3>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Candidate</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Relevant experience</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Overall match score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Non-negotiable<br/>requirement match
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50">
                      {/* Rank */}
                      <td className="py-4 px-4">
                        <RankBadge rank={candidate.rank} />
                      </td>

                      {/* Candidate */}
                      <td className="py-4 px-4">
                        <CandidateAvatar 
                          initials={candidate.initials}
                          name={candidate.name}
                          email={candidate.email}
                        />
                      </td>

                      {/* Experience */}
                      <td className="py-4 px-4">
                        <ExperienceList 
                          experience={candidate.experience}
                          experienceText={candidate.experienceText}
                          isParsing={candidate.isParsing}
                        />
                      </td>

                      {/* Match Score */}
                      <td className="py-4 px-4">
                        <MatchScore score={candidate.matchScore} />
                      </td>

                      {/* Non-negotiable Match */}
                      <td className="py-4 px-4">
                        <RequirementMatch matches={candidate.nonNegotiableMatch} />
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <StatusBadge 
                          status={candidate.status}
                          statusColor={candidate.statusColor}
                        />
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4">
                        <ActionsDropdown 
                          candidateId={candidate.id}
                          isOpen={activeDropdown === candidate.id}
                          onToggle={() => setActiveDropdown(activeDropdown === candidate.id ? null : candidate.id)}
                          onAIInterview={handleAIInterview}
                          onHumanInterview={handleHumanInterview}
                          onViewProfile={handleViewProfile}
                          onReject={handleReject}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No candidates found matching your search
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
};

export default CandidateRankingPage;