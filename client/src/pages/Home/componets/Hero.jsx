import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  let navigate = useNavigate()
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-900'>
      <h1 className='text-white text-4xl md:text-7xl text-center px-8 mb-8'>
        Place where privacy meets security.{' '}
        <a className="bg-gradient-to-br from-blue-500 to-blue-300 text-transparent bg-clip-text underline decoration-blue-500 decoration-2">
          secretswap
        </a>{' '}
        Share and download files completely anonymously
      </h1>
      <button onClick={()=>{navigate('/download')}} className='px-8 py-4 bg-blue-600 text-white rounded-lg transition duration-300'>
        Get Started
      </button>
    </div>
  );
}

export default Hero;
