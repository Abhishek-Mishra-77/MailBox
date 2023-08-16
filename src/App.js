import React from 'react';
import Login from './components/Authentication/Login';
import './App.css';
import Home from './components/Home/Home';
import Inbox from './components/Inbox/Inbox';
import Compose from './components/Compose/Compose';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/auth' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Home />} />
          <Route path='/compose' element={<Compose />} />
          <Route path='/inbox' element={<Inbox />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
