import { useDispatch } from "react-redux";

import { useEffect, useState, lazy, Suspense  } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// const LandingPage = lazy(()=> import('./components/landingPage/landingPage'))
// const  HomePage = lazy(() => import('./components/homePage/homePage'));
// const DetailPage = lazy(() => import('./components/detailPage/DetailPage'))
// const CreateGame = lazy(() => import('./components/create/CreateGame'))
// const FormPage = lazy(()=> import('./components/formPage/formPage'))
// const LoginUSer = lazy(()=> import('./components/Users/Login'))
// const SearchBar = lazy(()=> import('./components/searchBar/searchBar')) 

import LandingPage from './components/landingPage/landingPage';
import CreateGame from './components/create/CreateGame';
import FormPage from './components/formPage/formPage';
import LoginUSer from './components/Users/Login';
import SearchBar from './components/searchBar/searchBar';
import HomePage from './components/homePage/homePage';
import DetailPage from './components/detailPage/DetailPage';
import Loading from "./components/Loading/Loading";

const App = () => {
  const {pathname} = useLocation();

  // const dispatch = useDispatch();

  //   useEffect(()=>{
  //       dispatch(getAllVideoGames())
  //   }, [dispatch])

  return (
    <div>
      { pathname !== '/' && pathname !== '/home' &&  <div>
                    <SearchBar />
                </div>}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {/* <Route path='/' element={<Loading />} /> */}
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
