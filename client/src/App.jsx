import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './globalComponents/Header/Header';
import Download from './pages/Download/Download';
import { Toaster } from 'react-hot-toast';
import Upload from './pages/Upload/Upload';


function App() {
  return (
    <Router>
       <Toaster />
      <div>
        <Routes>
          <Route path="/" element={<><Header/> <Home/></>} />
          <Route path="/download" element={<><Header/> <Download/></>} />
          <Route path="/upload" element={<><Header/> <Upload/></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
