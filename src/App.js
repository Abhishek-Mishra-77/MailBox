import React from 'react';
import Login from './components/Authentication/Login';
import './App.css';
import Home from './components/Home/Home';
import Inbox from './components/Inbox/Inbox';
import Compose from './components/Compose/Compose';
import InboxRead from './components/Inbox/InboxRead';
import InboxMail from './components/Inbox/InboxMail'
import Send from './components/send/Send';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/auth' element={<Login />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='*' element={<Home />} />
          <Route path='/compose' element={<Compose />} />
          <Route path='/inbox' element={<Inbox />} >
            <Route path='mail' element={<InboxMail />} />
            <Route path='inboxmessage' element={<InboxRead />} />
            <Route path='send' element={<Send />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
