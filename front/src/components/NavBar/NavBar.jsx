import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    alphabeticalOrder,
    filterVideoGames,
    getAllGenres,
    getAllVideoGames,
    getCreated,
    getNoCreated,
    ratingOrder
} from "../../redux/Actions/actions";
import style from './NavBar.module.css'
import Loading from "../Loading/Loading";

const NavBar = () => {
    const genres = useSelector((state) => state.genres);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGenres())
    }, []);

    
    const handleNoCreatedButton = ()=>{
        dispatch(getNoCreated())
    }

    const handleCreatedButton = () => {
        dispatch(getCreated());
    };


    const handleAllGames = () => {
        dispatch(getAllVideoGames());
    };

    const handleFilter = (event) => {
        dispatch(filterVideoGames(event.target.value));
    };

    const ratingHandler = (event) => {
        dispatch(ratingOrder(event.target.value))
    };

    const handleSort = (event) => {
        dispatch(alphabeticalOrder(event.target.value));
    };

    return (

        <div className={style.container}>
            {
                useEffect ? (
                <div className={style.navBar}>
                <h3 className={style.titleNav} >Filters:</h3>
                <div className={style.btnFilter} >
                    <button
                        className={style.btnFilterBtn}
                        value='created'
                        onClick={handleCreatedButton}>Created
                    </button>
                </div>

                <div className={style.btnFilter} >
                    <button
                        className={style.btnFilterBtn}
                        value='created'
                        onClick={handleNoCreatedButton}>Uncreated
                    </button>
                </div>

                <div className={style.btnFilter}>
                    <button
                        className={style.btnFilterBtn}
                        value="AllGames"
                        onClick={handleAllGames}>All Games
                    </button>
                </div>
                <h3 className={style.titleNav} >Orders:</h3>
                <div className={style.btnFilter}>
                    <select className={style.selectFilter}
                        name="rating"
                        placeholder="Rating"
                        onChange={ratingHandler}>
                        <option disabled selected>Sort by rating</option>
                        <option value='Falling'>
                            Best to Worst</option>
                        <option value='Upward'>Worse to Better</option>
                    </select>
                </div>

                <div className={style.btnFilter}>
                    <select className={style.selectFilter}
                        name="alphabetical"
                        placeholder="Alphabetical"
                        onChange={handleSort}>
                        <option disabled selected>Sort by name</option>
                        <option value='A'>Upwardt</option>
                        <option value='D'>Falling</option>
                    </select>
                </div>

                <div className={style.btnFilter}>
                    <select
                        className={style.selectFilter}
                        name="genres"
                        placeholder="Gender"
                        onChange={handleFilter}
                    >
                        <option disabled >Choose a genre</option>
                        {genres.map((genre) => (
                            <option
                                key={genre.id}
                                value={genre.name}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div >
                ) : (
                <Loading/>
                )
            }
            
        </div>
    )
};

export default NavBar;