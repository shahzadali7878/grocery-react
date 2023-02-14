import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import Admin from './Components/Admin/Admin';

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <header className="App-Header">
        <Header />
      </header>

      <div className="App-Body">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
