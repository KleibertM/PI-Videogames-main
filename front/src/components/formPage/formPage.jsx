import { useEffect, useState } from "react";
import { getAllGenres, getAllPlatforms } from "../../redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Validation from "./validationForm";
import axios from "axios";

const FormPage = () => {
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms)
    const dispatch = useDispatch()
    const URL = 'http://localhost:3001/videogames';

    // useEffect(() => {
    //     dispatch(getAllGenres())
    // }, []);

    useEffect(() => {
        dispatch(
            getAllGenres(),
        )
    }, []);

    const [form, setForm] = useState({
        name: "",
        description: "",
        platforms: [],
        genres: [],
        image: "",
        released: "",
        rating: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: [],
        genres: [],
        image: "",
        released: "",
        rating: "",
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        if (property === "genres") {
            const genreName = event.target.value;
            if (!form.genres.includes(genreName)) {
                setForm({
                    ...form,
                    genres: [...form.genres, genreName]
                });
            }
        } else if (property === "platforms") {
            const platformName = event.target.value;
            if (!form.platforms.includes(platformName)) {
                setForm({
                    ...form,
                    platforms: [...form.platforms, platformName]
                });
            }
        } else {
            setForm({
                ...form,
                [property]: value
            });
        }

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
            axios.post(`${URL}`, form)
                .then((response) => alert('Successfully created'))
                .catch((error) => alert("Error creating video game"));
        } else {
            alert('There are errors in the form. Cannot submit')
        }
    };

    return (
        <div>
            <h1>Formulario de Creación de Videojuego</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <label>Name:
                    <input
                        type="text"
                        value={form.name}
                        name="name"
                        onChange={changeHandler} required
                        style={{ borderColor: errors.name ? 'red' : 'initial' }}
                    >
                    </input>
                    {errors.name && <p>{errors.name}</p>}
                </label>

                <label>Imagen:
                    <input
                        type="file"
                        value={form.image}
                        name="image"
                        onChange={changeHandler} required
                    ></input>
                    {errors.image && <p>{errors.image}</p>}
                </label>

                <label>Descripción:
                    <textarea
                        value={form.description}
                        onChange={changeHandler} rows="4"
                        name="description"
                        required
                    ></textarea>
                    {errors.description && <p>{errors.description}</p>}
                </label>

                <label>Platforms:
                    {platforms.map((platform) => (
                        <label key={platform.id}>
                            <input
                                type="checkbox"
                                name="platforms"
                                value={platform.name}
                                checked={form.platforms.includes(platform.name)}
                                onChange={changeHandler}
                            />
                            {platform.name}
                        </label>
                    ))}
                </label>

                <label>Fecha de Lanzamiento:
                    <input type="date"
                        value={form.released}
                        onChange={changeHandler}
                        name="released"
                        required
                    ></input>
                    {errors.released && <p>{errors.released}</p>}
                </label>

                <label>Rating:
                    <input type="number"
                        value={form.rating}
                        name="rating"
                        onChange={changeHandler}
                        min="0" max="5" step="0.1" required >

                    </input>
                    {errors.rating && <p>{errors.rating}</p>}
                </label>

                <label>Géneros:
                    {genres.map((genre) => (
                        <label key={genre.id}>
                            <input
                                type="checkbox"
                                name="genres"
                                value={genre.name}
                                checked={form.genres.includes(genre.name)}
                                onChange={changeHandler}
                            />
                            {genre.name}
                        </label>
                    ))}
                    {errors.genres && <p>{errors.genres}</p>}
                </label>

                <button type="submit">
                    Crear Videojuego
                </button>
            </form>
            {/* 
            {errors && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors}</div>} */}
        </div>
    )
}

export default FormPage;