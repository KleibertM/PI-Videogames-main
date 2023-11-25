import Footer from '../Footer/Footer';
import SearchBar from '../searchBar/searchBar';
import style from './landingPage.module.css';

import {NavLink} from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className={style.container}>
            <div className={style.btn_home}>
            <NavLink to='/home'>
                <button>Ingresar</button>
            </NavLink>
        </div>
        </div >
    )
};

export default LandingPage;