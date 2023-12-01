import styles from './Card.module.css'
import { Link } from 'react-router-dom';

const Card = ({ id, name, image, rating }) => {
    return (
        <div className={styles.container}>
            <div key={id} className={styles.card} >
                <div className={styles.imgCard}>
                    <img src={image} alt={name} className={styles.img} loading='lazy' />
                </div>
                <div>
                    <div className={styles.dataContainer}>
                        <div className={styles.data}>
                            <p>ID: {id}</p>
                            <h2>Name: {name}</h2>
                            <h4>rating: {rating}</h4>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <Link to={`/detail/${id}`}>
                            More Info
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;