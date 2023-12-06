import Loading from '../Loading/Loading';
import styles from './Card.module.css'
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import { deleteGame, paginateGames } from '../../redux/Actions/actions';

const Card = ({ id, name, image, rating, genres }) => {
    const dispatch = useDispatch();

    // const deleteVideoGames = (id) =>{
    //     dispatch(deleteGame(id))
    // }
    return (
        <div className={styles.container}>
            {
                genres ? (
                    <div key={id} className={styles.card} >
                        {/* <div><button onClick={deleteVideoGames(id)}>Delete</button></div> */}
                <div className={styles.imgCard}>
                    <img src={image} alt={name} className={styles.img} loading='lazy' />
                </div>
                <div className={styles.dataContainer}>
                    <div className={styles.data}>
                        <h2 className={styles.titleGame} > {name}</h2>
                        <p className={styles.dataRating} >Rating: <b className={styles.ratingText}> {rating}</b> </p>

                        <div className={styles.dataGenres}>
                            <p className={styles.genresTitle}>Genres:</p>
                            <div className={styles.anim} >
                                <div className={styles.genresContainer}>
                                    {genres.map((genre, index) => (
                                        <p key={index} className={styles.genresText}>
                                            {genre}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
               
                <div className={styles.info}>
                    <NavLink to={`/detail/${id}`} className={styles.detailLink}>
                        i
                        <p className={styles.detailText}>Detail</p>
                    </NavLink>
                </div>
            </div>
                ) : (
                    <Loading />
                )
            }

        </div>
    )
}

export default Card;