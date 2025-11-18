import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, X } from 'lucide-react';
import Navbar from '../components/NavBar';
import Button from '../components/Buttons';
import recruitersData from '../mock/recruitersData';

const ManageRecruitersPage = () => {
  const [recruiters, setRecruiters] = useState(recruitersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecruiterName, setNewRecruiterName] = useState('');
  const [newRecruiterEmail, setNewRecruiterEmail] = useState('');

  const handleFeedback = () => {
    alert('Feedback feature coming soon!');
  };

  const handleLogout = () => {
    alert('Logging out...');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRemove = () => {
    if (selectedRecruiters.length === 0) {
      alert('Please select recruiters to remove');
      return;
    }
    
    if (window.confirm(`Remove ${selectedRecruiters.length} recruiter(s)?`)) {
      setRecruiters(recruiters.filter(r => !selectedRecruiters.includes(r.id)));
      setSelectedRecruiters([]);
    }
  };

  const handleAddNew = () => {
    if (newRecruiterName.trim() === '') {
      alert('Please enter a recruiter name');
      return;
    }

    if (newRecruiterEmail.trim() === '') {
      alert('Please enter a recruiter email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newRecruiterEmail.trim())) {
      alert('Please enter a valid email address');
      return;
    }

    const newRecruiter = {
      id: Date.now(),
      name: newRecruiterName.trim(),
      email: newRecruiterEmail.trim()
    };

    setRecruiters([...recruiters, newRecruiter]);
    setNewRecruiterName('');
    setNewRecruiterEmail('');
    setShowAddModal(false);
  };

  const toggleRecruiterSelection = (id) => {
    if (selectedRecruiters.includes(id)) {
      setSelectedRecruiters(selectedRecruiters.filter(rId => rId !== id));
    } else {
      setSelectedRecruiters([...selectedRecruiters, id]);
    }
  };

  const filteredRecruiters = recruiters.filter(recruiter =>
    recruiter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        variant="dashboard"
        onFeedback={handleFeedback}
        onLogout={handleLogout}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recruiters</h1>
        </div>

        {/* Controls Row */}
        <div className="flex items-center gap-3 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Button */}
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={20} className="text-gray-600" />
          </button>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <X size={18} />
            Remove
          </button>

          {/* Add New Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <Plus size={18} />
            Add new
          </button>
        </div>

        {/* Recruiters List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-3">
            {filteredRecruiters.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No recruiters found</p>
            ) : (
              filteredRecruiters.map((recruiter) => (
                <div
                  key={recruiter.id}
                  onClick={() => toggleRecruiterSelection(recruiter.id)}
                  className={`px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    selectedRecruiters.includes(recruiter.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <p className="text-gray-900">{recruiter.name}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      {/* Add New Recruiter Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Recruiter</h2>
            
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter recruiter name"
                  value={newRecruiterName}
                  onChange={(e) => setNewRecruiterName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter recruiter email"
                  value={newRecruiterEmail}
                  onChange={(e) => setNewRecruiterEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewRecruiterName('');
                  setNewRecruiterEmail('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <Button onClick={handleAddNew}>
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRecruitersPage;