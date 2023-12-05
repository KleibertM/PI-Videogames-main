import { useEffect, useState } from "react";
import { getAllGenres } from "../../redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Validation from "./validationForm";
import axios from "axios";
import style from './form.module.css'
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const FormPage = () => {
    const genres = useSelector((state) => state.genres);

    const dispatch = useDispatch()
    const URL = 'http://localhost:3001';

    useEffect(() => {
        dispatch(
            getAllGenres()
        )
    }, []);

    const [form, setForm] = useState({
        name: "",
        description: "",
        platforms: "",
        genres: [],
        image: "",
        released: "",
        rating: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: "",
        genres: [],
        image: "",
        released: "",
        rating: "",
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const { value, checked } = event.target;

        if (property === "genres") {
            if (checked) {
                setForm({
                    ...form,
                    genres: [...form.genres, value]
                })
            } else {
                setForm({
                    ...form,
                    genres: [...form.genres.filter(i => i !== value)]
                })
            }
        } else {
            setForm({
                ...form,
                [property]: value
            });
        };
        setErrors(
            Validation({
                ...form,
                [property]: value
            })
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationForm = Validation(form);
        setErrors(validationForm);
        const hasErrors = Object.values(validationForm).some((error) => !!error);

        if (!hasErrors) {
            axios.post(`${URL}/videogames`, form)
                .then((response) => alert('Successfully created'))
                .catch((error) => alert("Error creating video game"));
        } else {
            alert('There are errors in the form. Cannot submit')
        }
    };

    return (
        <div className={style.container}>
            {
                form ? ( 
                    <>
                    <Link to='/home'>
                <div className={style.btnIcon}>
                    <button className={style.btn}> &lt;
                    </button>
                    <p className={style.btnText}>Back</p>
                </div>
                </Link>
            <form encType="multipart/form-data" onSubmit={handleSubmit} className={style.form}>
                <h1 className={style.titleForm}>Video Game Creation Form</h1>
                <div className={style.boxLabel}>
                    <label className={style.label} >Name:
                        <input className={style.inputData} type="text"
                            name="name"
                            value={form.name}
                            onChange={changeHandler} />
                            {errors.name && <p>{errors.name}</p>}
                    </label>
                </div>

                <div className={style.boxLabel}>
                    <label className={style.label} >Genres:
                        <div className={style.genres}>
                            {genres.map((genre) => (
                                <div key={genre.id} className={style.genreContain}>
                                    <input className={style.inputData}
                                        type="checkbox"
                                        name="genres"
                                        value={genre.name}
                                        checked={form.genres.includes(genre.name)}
                                        onChange={changeHandler}
                                    />
                                    <label className={style.nameGenre} >{genre.name}</label>
                                </div>
                            ))}
                        </div>
                        {errors.genres && <p>{errors.genres}</p>}
                    </label>
                </div>


                <div className={style.boxLabel}>
                    <label className={style.label} >Platforms:
                        <input className={style.inputData}
                            value={form.platforms}
                            type="text"
                            name="platforms"
                            onChange={changeHandler}
                            style={{
                                borderColor: errors.platforms
                                    ? 'red'
                                    : 'initial'
                            }}>
                        </input>
                        {errors.platforms && <p>{errors.platforms}</p>}
                    </label>
                </div>

                <div className={style.boxLabel}>
                    <label className={style.label}>Rating:
                        <input className={style.inputData}
                            value={form.rating}
                            type="number"
                            name="rating"
                            step="0.1"
                            onChange={changeHandler}>
                        </input>
                        {errors.rating && <p>{errors.rating}</p>}
                    </label>
                </div>

                <div className={style.boxLabel}>
                    <label className={style.label} >
                        Image:
                        <input
                            className={style.inputData}
                            value={form.image}
                            type="text"
                            name="image"
                            onChange={changeHandler}
                        />
                        {errors.image && <p>{errors.image}</p>}
                    </label>
                </div>



                <div className={style.boxLabel}>
                    <label className={style.label} >Released:
                        <input className={style.inputData}
                            value={form.released}
                            type="date"
                            name="released"
                            autoComplete="off"
                            onChange={changeHandler}>
                        </input>
                        {errors.released && <p>{errors.released}</p>}
                    </label>
                </div>

                <div className={style.boxLabel}>
                    <label className={style.label} >Description:
                        <textarea className={style.inputData}
                            value={form.description}
                            name="description"
                            rows="4"
                            onChange={changeHandler}>
                        </textarea>
                        {errors.description && <p>{errors.description}</p>}
                    </label>
                </div>

                <button className={style.submit} type="submit">Register</button>
            </form>
                    </>
                ) : (
                    <Loading/>
                )
            }
            
        </div>
    )
}

export default FormPage;