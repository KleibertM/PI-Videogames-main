import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetailVideoGame } from '../../redux/Actions/actions';
import { Link } from "react-router-dom";
import style from './detail.module.css'
import Loading from "../Loading/Loading";

const DetailPage = () => {
    const { id } = useParams();
    const detail = useSelector((state) => state.detail);

    const dispatch = useDispatch();
    // const deleteVideoGames = (id) =>{
    //     dispatch(deleteGame(id))
    // }
    useEffect(() => {
        dispatch(getDetailVideoGame(id))
        return () => {
            dispatch(clearDetail());
        };
    }, [id])

    const genres = detail.genres;
    const platforms = detail.platforms;

    return (
        <div className={style.detailBox}>
            {detail.name ? (
                <div className={style.info} key={detail?.id}>
                    <Link to='/home'>
                        <div className={style.btnIcon}>
                            <button className={style.btn}> &lt;
                            </button>
                            <p className={style.btnText}>Back</p>
                        </div>
                    </Link>
                    <div className={style.detail}>
                        <div className={style.image}>
                            <img className={style.img} src={detail?.image} alt={detail?.name} />
                        </div>

                        <div className={style.detailText}>

                            <h2 className={style.titleDetail}>{detail?.name}</h2>

                            <div className={style.platforms}>
                                <p className={style.platformsTitle}>Platforms:</p>
                                <ul className={style.platformsUl}>
                                    {
                                        !isNaN(Number(id)) ? (
                                            platforms?.map((platform, index) =>
                                                <li className={style.platformsLi} key={index}>
                                                    {platform}
                                                </li>)
                                        ) : (
                                            <li className={style.platformsLi} >
                                                {platforms}
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>

                            <div className={style.genres}>
                                <p className={style.genresTitle}>Genres:</p>
                                <ul className={style.genresUl}>
                                    {genres?.map((genre, index) => <li className={style.genresLi} key={index}>{genre}</li>)}
                                </ul>
                            </div>

                            <p className={style.released} >Released: <b className={style.date} >{detail?.released}</b> </p>

                            <p className={style.rating} >Rating: <span className={style.data} >{detail?.rating}</span></p>

                            <small className={style.id} >Id: {detail?.id}</small>
                        </div>
                    </div>
                    <div className={style.description}>
                        <p className={style.titleDescr} >Description: </p>
                        <p className={style.textDescr}>{detail?.description}</p>
                        
                    </div>
                </div>
            ) : (
                <Loading />
            )
            }

        </div>
    )
}

export default DetailPage;