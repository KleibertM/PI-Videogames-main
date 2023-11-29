import { useSelector } from 'react-redux'
import  Card  from "../card/card";

const Cards = () => {
    const videoGames = useSelector((state) => state.videoGames);

    return (
        <div >
            {
                videoGames.map((char) => {
                    return <Card
                        image={char.image}
                        id={char.id}
                        key={char.id}
                        name={char.name}
                        genres={char.genres}
                        platforms={char.platforms}
                        release={char.release}
                        rating={char.rating}
                        description={char.description}
                    />
                })
            }
        </div>
    );
}

export default Cards;