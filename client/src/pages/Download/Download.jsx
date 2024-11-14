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
        toast.error( error.response.data.error || 'Download failed. Please try again.', { id: toastId });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter the code"
          className="border p-2 rounded mb-4"
        />
        <button
          onClick={handleDownload}
          disabled={!inputValue}
          className={`p-2 rounded ${inputValue ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Download;
