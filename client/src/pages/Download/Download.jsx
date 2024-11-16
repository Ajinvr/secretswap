import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Download() {
  const [inputValue, setInputValue] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDownload = async () => {
    if (inputValue) {
      const toastId = toast.loading('Downloading...');
      try {
        const response = await axios.post(
          `${backendUrl}/file/download`,
          {
            params: { key: inputValue },
            responseType: 'blob',
          }
        );

        const contentDisposition = response.headers['content-disposition'];
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : 'downloaded_file';

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success('Download successful!', { id: toastId });
      } catch (error) {
        toast.error(error.response.data.error || 'Download failed. Please try again.', { id: toastId });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-gray-900">
      <div className="bg-gray-100 p-8 rounded-xl shadow-lg w-full sm:w-96 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-900">Download File</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter the access code"
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          onClick={handleDownload}
          disabled={!inputValue}
          className={`w-full p-3 text-lg font-semibold rounded-lg transition duration-300 ease-in-out ${inputValue ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Download
        </button>
        <div className="text-center text-sm text-gray-600">
          <p>Enter the access code to download your file</p>
        </div>
      </div>
    </div>
  );
}

export default Download;
