import { dashboardData } from '../mock/DashboardData';


// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  // Get dashboard data
  getDashboardData: async () => {
    await delay(500); // Simulate API call
    
    // TODO: Replace with actual API call
    // const response = await fetch('/api/dashboard');
    // return response.json();
    
    return dashboardData;
  },

  // Pause job
  pauseJob: async (jobId) => {
    await delay(500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/jobs/${jobId}/pause`, {
    //   method: 'POST',
    // });
    // return response.json();
    
    console.log('Job paused:', jobId);
    return { success: true, message: 'Job paused successfully' };
  },

  // Resume job
  resumeJob: async (jobId) => {
    await delay(500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/jobs/${jobId}/resume`, {
    //   method: 'POST',
    // });
    // return response.json();
    
    console.log('Job resumed:', jobId);
    return { success: true, message: 'Job resumed successfully' };
  },

  // Delete job
  deleteJob: async (jobId) => {
    await delay(500);
    
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/jobs/${jobId}`, {
    //   method: 'DELETE',
    // });
    // return response.json();
    
    console.log('Job deleted:', jobId);
    return { success: true, message: 'Job deleted successfully' };
  }
};