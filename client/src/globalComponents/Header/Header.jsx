import React from 'react';

function Header() {
  return (
    <header className="backdrop-blur-lg  text-white fixed w-screen z-10">
      <div className="mx-auto flex justify-between items-center p-10 h-14">
        <a href='#' className="text-xl">secretswap</a>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#">about</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
