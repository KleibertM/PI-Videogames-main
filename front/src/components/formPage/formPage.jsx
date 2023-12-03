import { useEffect, useState } from "react";
import { getAllGenres } from "../../redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Validation from "./validationForm";
import axios from "axios";
import style from './form.module.css'

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
        const {value, checked} = event.target;

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

    console.log('data genre '+form.genres);
    console.log('data relea '+form.released);
    console.log('data imas '+form.image);
    console.log('data descr '+form.description);
    console.log('data name '+form.name);
    console.log('data ratin '+form.rating);
    console.log('data plat '+ form.platforms);


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
            <h1>Formulario de Creación de Videojuego</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div>
                <label>Name:
                    <input type="text"
                    name="name"
                    value={form.name}
                    onChange={changeHandler}/>
                </label>
            </div>
                <hr />
                <div>
                    <label>Genres:
                        {genres.map((genre) => (
                            <div key={genre.id}>
                                <input
                                    type="checkbox"
                                    name="genres"
                                    value={genre.name}
                                    checked={form.genres.includes(genre.name)}
                                    onChange={changeHandler}
                                />
                                <label>{genre.name}</label>
                            </div>
                        ))}
                        {errors.genres && <p>{errors.genres}</p>}
                    </label>
                </div>

                <div>
                    <label>Platforms:
                        <input
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

                <div>
                    <label>Rating:
                        <input
                            value={form.rating}
                            type="number"
                            name="rating"
                            step="0.1"
                            onChange={changeHandler}>
                        </input>
                        {errors.rating && <p>{errors.rating}</p>}
                    </label>
                </div>

                <div>
                    <label>Image:
                        <input
                            value={form.image}
                            type="text"
                            name="image"
                            placeholder="Enter Image URL"
                            onChange={changeHandler}
                        />
                        {errors.image && <p>{errors.image}</p>}
                    </label>
                </div>

                <hr />

                <div>
                    <label>released:
                        <input
                            value={form.released}
                            type="date"
                            name="released"
                            autoComplete="off"
                            onChange={changeHandler}>
                        </input>
                        {errors.released && <p>{errors.released}</p>}
                    </label>
                </div>

                <div>
                    <label>Description:
                        <textarea
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
        </div>
    )
}

export default FormPage;