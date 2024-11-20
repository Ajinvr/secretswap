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
          { key: inputValue }
        );

        const { filename, mimetype, fileData } = response.data;

        const binaryData = atob(fileData);
        const byteArray = new Uint8Array(binaryData.length);

        for (let i = 0; i < binaryData.length; i++) {
          byteArray[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: mimetype });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success('Download successful!', { id: toastId });
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Download failed. Please try again.';
        toast.error(errorMessage, { id: toastId });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-gray-900">
      <div className="sm:bg-gray-100 p-8 rounded-xl sm:shadow-lg w-full sm:w-96 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-white sm:text-gray-900">
          Download File
        </h2>
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
          className={`w-full p-3 text-lg font-semibold rounded-lg transition duration-300 ease-in-out ${
            inputValue
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Download
        </button>
        <div className="text-center text-sm text-gray-500">
          <p>Enter the access code to download your file</p>
        </div>
      </div>
    </div>
  );
}

export default Download;
