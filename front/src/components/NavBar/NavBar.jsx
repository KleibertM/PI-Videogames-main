import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    alphabeticalOrder,
    filterVideoGames,
    getAllGenres,
    getAllVideoGames,
    getCreated,
    ratingOrder
} from "../../redux/Actions/actions";
import style from './NavBar.module.css'

const NavBar = () => {
    const genres = useSelector((state) => state.genres);
    const allGame = useSelector((state) => state.allVideoGames)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGenres())
    }, []);

    
    const handleCreatedButton = () => {
        dispatch(getCreated());
    };
    
    const handleFilter = (event) => {
        dispatch(filterVideoGames(event.target.value));
    };

    const handleAllGames = () => {
        dispatch(getAllVideoGames());
    };

    const handleSort = (event) => {
        dispatch(alphabeticalOrder(event.target.value));
    };

    const ratingHandler = (event) => {
        dispatch(ratingOrder(event.target.value))
    };

    return (
        
        <div className={style.container}>
            <div className={style.navBar}>
                <h3 className={style.titleNav} >Filters:</h3>
                <div className={style.btnFilter} >
                    <button
                        className={style.btnFilterBtn}
                        value='created'
                        onClick={handleCreatedButton}>Created
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
                        <option disabled>Sort by rating</option>
                        <option value='Falling'>Better Rating</option>
                        <option value='Upward'>Down Rating</option>
                    </select>
                </div>

                <div className={style.btnFilter}>
                    <select className={style.selectFilter}
                        name="alphabetical"
                        placeholder="Alphabetical"
                        onChange={handleSort}>
                        <option disabled>Sort by name</option>
                        <option value='A'>Ascendt</option>
                        <option value='D'>Desendent</option>
                    </select>
                </div>

                <div className={style.btnFilter}>
                    <select
                        className={style.selectFilter}
                        name="genres"
                        placeholder="Gender"
                        onChange={handleFilter}
                    >
                        <option disabled >Genre selection</option>
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
        </div>
    )
};

export default NavBar;