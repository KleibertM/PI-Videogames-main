import { Link } from "react-router-dom";

const SearchCard = ({ id, name, rating, released, image }) => {
    return (
        <Link to={id}>
            <div>
                <img src={image} alt={name} />
                <h3>{name}</h3>
                <div>
                    <p>{released}</p>
                    <p>{rating}</p>
                </div>
            </div>
        </Link>
    )
}
export default SearchCard;