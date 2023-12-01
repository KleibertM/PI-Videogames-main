import { Link } from 'react-router-dom'
import { getGameByName } from '../../redux/Actions/actions';
import { useDispatch } from "react-redux";
import {  useState } from 'react';
import style from './searchBar.module.css';
import icon from '../../assets/img/iconGame.png'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('');
    const [errors, setErrors] = useState('');

    const inputChange = (event) => {
        setSearchName(event.target.value);
    };

    const searchHandler = () => {
        dispatch(getGameByName(searchName))
            .catch((error) => {
                setErrors(error.message);
                alert('No foung game')
            });
    };

    return (
        <div className={style.container} >
            <div className={style.boxLogo} >
                <Link to='/home'>
                    <img src={icon} alt='Icon Game' className={style.logoIcon} />
                </Link>
                <Link to='/home'>
                    <h1 className={style.logoText} >BOX GAME</h1>
                </Link>
            </div>
            <div className={style.searchBar} >
                <input
                    className={style.search}
                    type="search"
                    name="searchBar"
                    placeholder="Search..."
                    value={searchName}
                    onChange={inputChange}>
                </input>

                <button className={style.searchButton} onClick={searchHandler}>🔎</button>

                
            </div>


            <div className={style.boxUl} >
                <ul className={style.ulList} >
                    <li className={style.listItem} >
                        <Link to='/login'>
                            <button className={style.btnList}>Login</button>
                        </Link>
                    </li>
                    <li className={style.listItem} >
                        <Link to='/form' >
                            <button className={style.btnList}>cargar</button>
                        </Link>
                    </li>
                    <li className={style.listItem} >
                        <Link to='/'>
                            <button className={style.btnList}>help</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SearchBar;