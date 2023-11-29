
import './App.css';
import LandingPage from './components/landingPage/landingPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import DetailPage from './components/detailPage/detailPage';
import CreateGame from './components/create/CreateGame';
import FormPage from './components/formPage/formPage';

const App = () => {

  // const location = useLocation()


  return (
    <div>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={< HomePage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/create' element={< CreateGame />} />
        <Route path='/form' element={< FormPage />} />
      </Routes>
    </div>
  )
};

export default App;
