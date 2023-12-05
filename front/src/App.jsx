
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import LandingPage from './components/landingPage/landingPage';
import FormPage from './components/formPage/formPage';
import LoginUSer from './components/Users/Login';
import SearchBar from './components/searchBar/searchBar';
import HomePage from './components/homePage/homePage';
import DetailPage from './components/detailPage/DetailPage';

const App = () => {
  const {pathname} = useLocation();

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
        <Route path='/form' element={<FormPage />} />
        <Route path='/login' element={< LoginUSer />} />
      </Routes>
    </div>
  )
};

export default App;
