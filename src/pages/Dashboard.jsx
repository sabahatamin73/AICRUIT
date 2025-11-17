// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/NavBar';
// import Button from '../components/Buttons';
// import StatsCard from '../components/StatsCard';
// import JobCard from '../components/JobCard';
// import { dashboardService } from '../services/DashboardService';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     setIsLoading(true);
//     try {
//       const [statsData, jobsData] = await Promise.all([
//         dashboardService.getStats(),
//         dashboardService.getJobs()
//       ]);
//       setStats(statsData);
//       setJobs(jobsData);
//     } catch (error) {
//       console.error('Failed to load dashboard data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   const handleFeedback = () => {
//     alert('Feedback feature coming soon!');
//   };

//   const handleGetStarted = () => {
//     navigate('/create-shortlist');
//   };

//   const handleJobOptions = (job) => {
//     console.log('Job options:', job);
//   };

//   const statsConfig = [
//     {
//       title: 'Active Jobs',
//       value: stats?.activeJobs || 0,
//       icon: '📋'
//     },
//     {
//       title: 'Total Applied Candidate',
//       value: stats?.totalAppliedCandidates || 0,
//       icon: '👥'
//     },
//     {
//       title: 'Shortlisted candidates',
//       value: stats?.shortlistedCandidates || 0,
//       icon: '👤'
//     },
//     {
//       title: 'Interviews Scheduled',
//       value: stats?.interviewsScheduled || 0,
//       icon: '🔄'
//     }
//   ];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar variant="dashboard" onFeedback={handleFeedback} onLogout={handleLogout} />
      
//       <main className="max-w-7xl mx-auto px-8 py-12">
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-5xl font-bold text-gray-900 mb-3">Dashboard</h1>
//             <p className="text-gray-600 text-lg">View all your jobs in one place</p>
//           </div>
//           <Button 
//             onClick={handleGetStarted}
//             variant="primary"
//             icon="+"
//             className="text-lg"
//           >
//             Get Started
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {statsConfig.map((stat, index) => (
//             <StatsCard
//               key={index}
//               title={stat.title}
//               value={stat.value}
//               icon={stat.icon}
//             />
//           ))}
//         </div>

//         <div className="flex gap-4 mb-8">
//           <div className="flex-1 relative">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             <svg 
//               className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//             <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//             </svg>
//           </button>
//         </div>

//         <div className="space-y-4">
//           {jobs.length > 0 ? (
//             jobs.map((job) => (
//               <JobCard 
//                 key={job.id} 
//                 job={job} 
//                 onOptionsClick={handleJobOptions}
//               />
//             ))
//           ) : (
//             <div className="text-center py-16">
//               <p className="text-gray-500 text-lg">No jobs created yet. Click "Get Started" to create your first job.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Button, StatsCard, JobCard, DashboardDropdown } from '../components';
import { dashboardService } from '../services/DashboardService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await dashboardService.getDashboardData();
      setStats(data.stats);
      setJobs(data.jobs);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleFeedback = () => {
    alert('Feedback feature coming soon!');
  };

  const handleGetStarted = () => {
    navigate('/create-shortlist');
  };

  const handlePauseJob = async (jobId) => {
    try {
      await dashboardService.pauseJob(jobId);
      alert('Job paused successfully');
      await loadDashboardData();
    } catch (error) {
      console.error('Failed to pause job:', error);
      alert('Failed to pause job');
    }
  };

  const handleResumeJob = async (jobId) => {
    try {
      await dashboardService.resumeJob(jobId);
      alert('Job resumed successfully');
      await loadDashboardData();
    } catch (error) {
      console.error('Failed to resume job:', error);
      alert('Failed to resume job');
    }
  };

  const handleEditJob = (jobId) => {
    navigate(`/job/${jobId}/edit`);
  };

  const handleDeleteJob = async (jobId) => {
    const confirmed = window.confirm('Are you sure you want to delete this job? This action cannot be undone.');
    if (confirmed) {
      try {
        await dashboardService.deleteJob(jobId);
        alert('Job deleted successfully');
        await loadDashboardData();
      } catch (error) {
        console.error('Failed to delete job:', error);
        alert('Failed to delete job');
      }
    }
  };

  const handleJobOptions = (job) => {
    setActiveDropdown(activeDropdown === job.id ? null : job.id);
  };

  const statsConfig = [
    {
      title: 'Active Jobs',
      value: stats?.activeJobs || 0,
      iconType: 'briefcase'
    },
    {
      title: 'Total Applied Candidate',
      value: stats?.totalCandidates || 0,
      iconType: 'users'
    },
    {
      title: 'Shortlisted candidates',
      value: stats?.shortlisted || 0,
      iconType: 'userCheck'
    },
    {
      title: 'Interviews Scheduled',
      value: stats?.interviewsScheduled || 0,
      iconType: 'calendar'
    }
  ];

  const filteredJobs = jobs.filter(job =>
    (job.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.position || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="dashboard" onFeedback={handleFeedback} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Dashboard</h1>
            <p className="text-gray-600 text-lg">View all your jobs in one place</p>
          </div>
          <Button
            onClick={handleGetStarted}
            variant="primary"
            icon="+"
            className="text-lg"
          >
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsConfig.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              iconType={stat.iconType}
            />
          ))}
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="relative">
                <JobCard
                  job={job}
                  onOptionsClick={handleJobOptions}
                />
                {activeDropdown === job.id && (
                  <div className="absolute right-6 top-16 z-20">
                    <DashboardDropdown
                      jobId={job.id}
                      isOpen={true}
                      onToggle={() => setActiveDropdown(null)}
                      onPause={handlePauseJob}
                      onResume={handleResumeJob}
                      onEdit={handleEditJob}
                      onDelete={handleDeleteJob}
                      isPaused={job.status === 'paused'}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {searchQuery ? 'No jobs found matching your search' : 'No jobs created yet. Click "Get Started" to create your first job.'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;