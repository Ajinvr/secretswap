import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './globalComponents/Header/Header';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<><Header/> <Home/></>} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
