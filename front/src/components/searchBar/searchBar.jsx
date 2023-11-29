import {Link} from 'react-router-dom'
import { getGameByName } from '../../redux/Actions/actions';
import { useDispatch } from "react-redux";
import { useState } from 'react';

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
            });
    };
    return (
        <div>
            <div>
                <h1>Logo</h1>
            </div>
            <div>
                <input type="search" 
                placeholder="buscador" 
                value={searchName}
                onChange={inputChange} />
                <button onClick={searchHandler}>search</button>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to='/'>
                            <button>Login</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/' >
                            <button>cargar</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <button>help</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;