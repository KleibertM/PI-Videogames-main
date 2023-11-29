import SearchBar from "../searchBar/searchBar";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from 'react-redux';
import { clearDetail, getAllVideoGames, paginateGames } from "../../redux/Actions/actions";
import { useEffect } from "react";
import Cards from '../Cards/Cards'

const HomePage = ()=>{
    const dispatch = useDispatch();

    const paginate = (e) => {
        dispatch(paginateGames(e.target.name))
    }

    const allGames = useSelector((state)=> state.allGames)

    useEffect(()=>{
        dispatch(getAllVideoGames())
        return (()=>{
            clearDetail()
        })
    }, [dispatch])


    return(
        <div>
            <SearchBar/>
            <NavBar/>
            <div>
                <Cards/>
            </div>

            <div >
                <button
                    name="prev"
                    onClick={paginate}>Prev
                </button>
                <button
                    name="next"
                    onClick={paginate}>Next
                </button>
            </div>
        </div>
    )
};

export default HomePage;