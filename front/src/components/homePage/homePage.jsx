import { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getAllVideoGames, paginateGames } from "../../redux/Actions/actions";
import style from './homePage.module.css'

import Cards from '../Cards/Cards'
import SearchBar from "../searchBar/searchBar";
import NavBar from "../NavBar/NavBar";
import Loading from '../Loading/Loading';
import Footer from '../Footer/Footer';

// const SearchBar = lazy(() => import('../searchBar/searchBar'))
// const NavBar = lazy(() => import('../NavBar/NavBar'))
// const Cards = lazy(() => import('../Cards/Cards'))

const HomePage = () => {
    const dispatch = useDispatch();
    const paginate = (e) => {
        dispatch(paginateGames(e.target.name))
    }

    useEffect(() => {
        dispatch(getAllVideoGames())
        return (() => {
            clearDetail()
        })
    }, [dispatch])


    return (
        <div className={style.container}>
            {
                Cards ? (
                    <>
                        <div className={style.homeBar}>
                            <div className={style.homeBarComp}>
                                <SearchBar />
                                <NavBar />
                            </div>
                        </div>
                        <div className={style.homeCards}>
                            <Cards />
                        </div>

                        <div className={style.btnPage} >
                            <div className={style.btnIcon}>
                                <button className={style.btn}
                                    name="prev"
                                    onClick={paginate}> &lt;
                                </button>
                                <p className={style.btnText}>Prev</p>
                            </div>
                            <div className={style.btnIcon}>
                                <button className={style.btn}
                                    name="next"
                                    onClick={paginate}> &gt;
                                </button>
                                <p className={style.btnText}>Next</p>
                            </div>

                        </div>
                    </>
                ) :
                    (<Loading />)
            }

        </div>
    )
};

export default HomePage;