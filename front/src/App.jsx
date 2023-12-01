
import './App.css';
import LandingPage from './components/landingPage/landingPage';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import DetailPage from './components/detailPage/detailPage';
import CreateGame from './components/create/CreateGame';
import FormPage from './components/formPage/formPage';
import { useEffect, useState } from 'react';
import LoginUSer from './components/Users/Login';

const App = () => {

  return (
    <div>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={< HomePage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/create' element={< CreateGame />} />
        <Route path='/form' element={<FormPage />} />
        <Route path='/login' element={< LoginUSer />} />
      </Routes>
    </div>
  )
};

export default App;
