
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './landingPage.module.css';
import { NavLink } from 'react-router-dom'
import { getAllVideoGames } from '../../redux/Actions/actions';
import Loading from '../Loading/Loading';

const LandingPage = () => {
    const dispatch = useDispatch();
    const image = useSelector((state)=> state.allVideoGames)

    useEffect(()=>{
        dispatch(getAllVideoGames())
    }, [])
   

    if (!image) {
        return <Loading />;
    }

    return (
        <div className={style.container}>
            <div className={style.btn_home}>
                {image?.splice(3, 20).map((img, index) =>
                    <img className={style.img} src={img.image} alt={img.name} key={index} loading='lazy' 
                    />)}

                <NavLink to='/home' className={style.btn}>
                    <button className={style.btnText}>Get in</button>
                </NavLink>
            </div>
        </div >
    )
};

export default LandingPage;