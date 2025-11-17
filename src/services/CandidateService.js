import { candidateRankingData } from '../mock/CandidateRankingData';
import { candidateProfileData } from '../mock/CandidateProfileData';

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const candidateService = {
  // Get job and candidate data
  getCandidateRanking: async (jobId) => {
    await delay(500); // Simulate API call

    // TODO: Replace with actual API call
    // const response = await fetch(`/api/jobs/${jobId}/candidates`);
    // return response.json();

    return candidateRankingData;
  },

  // Get candidate profile
  getCandidateProfile: async (candidateId) => {
    await delay(500);

    // TODO: Replace with actual API call
    // const response = await fetch(`/api/candidates/${candidateId}/profile`);
    // return response.json();

    const profile = candidateProfileData[candidateId];
    if (!profile) {
      throw new Error('Candidate not found');
    }
    return profile;
  },

  // Accept candidate
  acceptCandidate: async (candidateId) => {
    await delay(500);

    // TODO: Replace with actual API call
    // const response = await fetch(`/api/candidates/${candidateId}/accept`, {
    //   method: 'POST',
    // });
    // return response.json();

    console.log('Candidate accepted:', candidateId);
    return { success: true, message: 'Candidate accepted' };
  },

  // Invite candidate for AI interview
  inviteForAIInterview: async (candidateId) => {
    await delay(500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/candidates/${candidateId}/invite-ai`, {
    //   method: 'POST',
    // });
    // return response.json();
    
    console.log('AI Interview invite sent to candidate:', candidateId);
    return { success: true, message: 'AI interview invitation sent' };
  },

  // Invite candidate for human interview
  inviteForHumanInterview: async (candidateId) => {
    await delay(500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/candidates/${candidateId}/invite-human`, {
    //   method: 'POST',
    // });
    // return response.json();
    
    console.log('Human Interview invite sent to candidate:', candidateId);
    return { success: true, message: 'Human interview invitation sent' };
  },

  // Reject candidate
  rejectCandidate: async (candidateId) => {
    await delay(500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/candidates/${candidateId}/reject`, {
    //   method: 'POST',
    // });
    // return response.json();
    
    console.log('Candidate rejected:', candidateId);
    return { success: true, message: 'Candidate rejected' };
  }
};