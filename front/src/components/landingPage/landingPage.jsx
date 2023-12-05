
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import style from './landingPage.module.css';

import {NavLink} from 'react-router-dom'

const LandingPage = () => {
    // const dispatch = useDispatch();

    // useEffect(()=>{
    //     dispatch(getAllVideoGames())
    //     return (()=>{
    //         clearDetail()
    //     })
    // }, [dispatch])
    return (
        <div className={style.container}>
            <div className={style.btn_home}>
            <NavLink to='/home' className={style.btn}>
                <button>Ingresar</button>
            </NavLink>
        </div>
        </div >
    )
};

export default LandingPage;