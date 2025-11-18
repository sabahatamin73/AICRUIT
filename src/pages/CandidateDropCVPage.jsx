import React, { useState } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const CandidateDropCVPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [expectedSalary, setExpectedSalary] = useState('');
  const [howDidYouFind, setHowDidYouFind] = useState('');

  const MAX_FILES = 25;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.type === 'application/msword' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isValidSize = file.size <= MAX_FILE_SIZE;
      return isValidType && isValidSize;
    });

    const remainingSlots = MAX_FILES - files.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    setFiles(prev => [...prev, ...filesToAdd]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      alert('Please upload at least one CV');
      return;
    }
    navigate('/client-dashboard');
    
    alert(`Submitted ${files.length} CV(s) successfully!`);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFeedback = () => {
    alert('Feedback feature coming soon!');
  };

  const handleLogout = () => {
    alert('Logging out...');
    // Add logout logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        variant="candidate-drop-cv"
        onFeedback={handleFeedback}
        onLogout={handleLogout}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Techrific</h1>
              <p className="text-sm text-gray-600 mt-1">Senior Software Developer</p>
            </div>
            
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Expected Salary */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Salary
            </label>
            <input
              type="text"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., $80,000 - $100,000"
            />
          </div>

          {/* How did you find out */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How did you find out about this job?
            </label>
            <textarea
              value={howDidYouFind}
              onChange={(e) => setHowDidYouFind(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all"
              placeholder="Tell us how you discovered this opportunity..."
            />
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Upload size={16} />
                Upload manually
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Drop CVs of candidates you want to evaluate - up to 1
            </p>

            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Upload size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Drag and drop files or browse</p>
                    <p className="text-sm text-gray-500 mt-1">PDF or DOC - Max 5MB</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">
                  Uploaded Files ({files.length}/{MAX_FILES})
                </p>
                <button
                  onClick={() => setFiles([])}
                  className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText size={20} className="text-purple-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                    >
                      <X size={18} className="text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning */}
          {files.length >= MAX_FILES && (
            <div className="mb-6 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                You've reached the maximum limit of {MAX_FILES} files. Remove some to add more.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={files.length === 0}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all ${
                files.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDropCVPage;