const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const jobService = {
  // POST /api/jobs/create
  async createJob(jobData) {
    await delay(500);
    // TODO: Replace with actual API call
    
    return {
      success: true,
      jobId: 'job_' + Date.now(),
      message: 'Job created successfully'
    };
  },

  // POST /api/jobs/:id/upload-jd
  async uploadJobDescription(jobId, file) {
    await delay(500);
    // TODO: Replace with actual API call
    
    return {
      success: true,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file)
    };
  },

  // GET /api/jobs/:id
  async getJob(jobId) {
    await delay(300);
    // TODO: Replace with actual API call

    return {
      id: jobId,
      roleTitle: 'Senior Software Developer',
      companyName: 'Techtrific',
      status: 'active'
    };
  },

  // POST /api/jobs/:id/upload-candidates
  async uploadCandidates(data) {
    await delay(1000);
    // TODO: Replace with actual API call

    return {
      success: true,
      message: `${data.files.length} candidate(s) uploaded successfully`,
      candidatesProcessed: data.files.length
    };
  },

  // POST /api/jobs/:id/generate-link
  async generateCandidateLink(data) {
    await delay(500);
    // TODO: Replace with actual API call

    return {
      success: true,
      link: `https://aicruit.com/apply/${data.jobId}`,
      expiresAt: new Date(Date.now() + data.settings.expiryDays * 24 * 60 * 60 * 1000)
    };
  }
};