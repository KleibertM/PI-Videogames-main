import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetailVideoGame } from '../../redux/Actions/actions';
import style from './detail.module.css'

const DetailPage = () => {
    const { id } = useParams();
    const detail = useSelector((state) => state.detail);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetailVideoGame(id));
        return () => {
            dispatch(clearDetail());
        };
    }, [id])
    const genres = detail.genres;
    return (
        <div className={style.detailBox}>
            <div className={style.info} key={detail.id}>
                <h2>{detail.name}</h2>
                <div className={style.detailTop}>
                    <img src={detail.image} alt={detail.name} />
                    <div className={style.detail}>
                        <h1>Id: {detail.id}</h1>
                        <p>Platforms: {detail.platforms}</p>
                        <p className={style.genres}>
                            Genres: {genres?.map((genre, index) => <span key={index}>{genre}</span>)}
                        </p>
                        <p>Released: {detail.released}</p>
                        <h6>Rating <span>{detail.rating}</span></h6>
                    </div>
                </div>
                <p>Description: {detail.description}</p>
            </div>
        </div>
    )
}

export default DetailPage;