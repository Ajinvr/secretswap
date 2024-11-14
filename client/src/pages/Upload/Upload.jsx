import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  
  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null); 

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post( `${backendUrl}/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.key && response.data.url) {
        setUploadedFile({
          key: response.data.key,
          url: response.data.url,
        });
        toast.success('File uploaded successfully!');
      } else {
        setError('Error: No file key or URL received');
        toast.error('Error: No file key or URL received');
      }
    } catch (err) {
      setError('Error uploading file: ' + err.message);
      toast.error('Error uploading file: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Upload File</h2>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-2 px-4 text-white rounded-md ${uploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>

        {error && (
          <div className="mt-4 text-red-600 text-center">
            {error}
          </div>
        )}

        {uploadedFile && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">File uploaded successfully!</p>
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              View uploaded file
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
