import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="backdrop-blur-lg text-white fixed w-screen z-10">
      <div className="mx-auto flex justify-between items-center p-5 h-14">
      <Link to="/">  <a className="text-2xl">secretswap</a></Link>
        <nav>
          <ul className="flex space-x-4 text-gray-400">
            <li>
              <Link to="/upload" className="underline">Upload</Link>
            </li>
            <li>
              <Link to="/download" className="underline">Download</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
