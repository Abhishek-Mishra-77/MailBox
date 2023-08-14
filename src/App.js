import React from 'react';
import Login from './components/Authentication/Login';
import './App.css';
import NavBar from './components/Header/NavBar';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/auth' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
