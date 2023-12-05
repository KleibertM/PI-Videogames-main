import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    alphabeticalOrder,
    filterVideoGames,
    getAllGenres,
    getAllVideoGames,
    getCreated,
    getNoCreated,
    getVideoGames,
    ratingOrder
} from "../../redux/Actions/actions";
import style from './NavBar.module.css'
import Loading from "../Loading/Loading";
import filterIcon from '../../assets/img/filterIcon.png'

const NavBar = () => {
    const genres = useSelector((state) => state.genres);
    const dispatch = useDispatch();
    const [filterOpen, setFilterOpen] = useState(false);

    const handlerSearchBar = () => {
        setFilterOpen(!filterOpen);
    }

    useEffect(() => {
        dispatch(getAllGenres())
    }, []);


    const handleNoCreatedButton = () => {
        dispatch(getNoCreated())
    }

    const handleCreatedButton = () => {
        dispatch(getCreated());
    };


    const handleAllGames = () => {
        dispatch(getVideoGames());
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
            <div className={style.toggleBtn} onClick={handlerSearchBar}>
            <img className={style.iconToggle} src={filterIcon} alt="" />
            </div>
            
            {
                filterOpen ? ( 
                    <>
                    {filterOpen && (
                        <div className={style.mobileFilter}>
                            <div className={style.navBar}>
                                <div className={style.contenFilters}>
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
                                </div>
                                <div className={style.contenFilters}>
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
                                        ><option disabled selected >Choose a genre</option>
                                            {genres.map((genre) => (
                                                <option
                                                    key={genre.id}
                                                    value={genre.name}>
                                                    {genre.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div >
                        </div>
                    )}
                </>
                ) : (
                    <div className={style.navBar}>
                                <div className={style.contenFilters}>
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
                                </div>
                                <div className={style.contenFilters}>
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
                                        ><option disabled selected >Choose a genre</option>
                                            {genres.map((genre) => (
                                                <option
                                                    key={genre.id}
                                                    value={genre.name}>
                                                    {genre.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div >
                )
            }

        </div>
    )
};

export default NavBar;