import React, { useState } from 'react';
import axios from 'axios';

const DownloadReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the PDF download
  const handleDownload = async (month, year) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3002/api/export?month=${month}&year=${year}`,
        { responseType: 'blob',
        headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });

      const blob = response.data;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${year}-${month}.pdf`);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading the PDF:', err);
      setError('There was an error generating or downloading the PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Download Financial Report</h2>

        {/* Input fields for month and year */}
        <div className="space-y-4">
          <div>
            <input
              type="number"
              min="1"
              max="12"
              placeholder="Month (1-12)"
              id="month"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="number"
              min="2020"
              max="2099"
              placeholder="Year (2020-2099)"
              id="year"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              const month = document.getElementById('month').value;
              const year = document.getElementById('year').value;
              handleDownload(month, year);
            }}
            disabled={loading}
            className={`w-full p-3 rounded-md text-white font-semibold ${
              loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default DownloadReport;
