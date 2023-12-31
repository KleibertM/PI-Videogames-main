import { useSelector } from 'react-redux'
import  Card  from "../card/card";
import style from './cards.module.css'
import Loading from '../Loading/Loading';

const Cards = () => {
    const videoGames = useSelector((state) => state.videoGames);
    return (
        <div className={style.cardContainer} >
                    {
                        videoGames.map((char) => {
                            return <Card
                                image={char.image}
                                id={char.id}
                                key={char.id}
                                name={char.name}
                                genres={char.genres}
                                platforms={char.platforms}
                                released={char.released}
                                rating={char.rating}
                                description={char.description}
                            />
                        })
                    }
        </div>
    );
}

export default Cards;