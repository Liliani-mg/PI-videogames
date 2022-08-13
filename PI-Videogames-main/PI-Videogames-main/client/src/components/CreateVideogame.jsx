import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenres, createGame } from "../actions";
import { v4 as uuid } from "uuid";
import "./CreateVideogame.css";

function validate(input) {
  let errors = {};
  if (input.platforms.length === 0) {
    errors.platforms = "Ingrese al menos una plataforma";
  }
  if (
    input.name === null ||
    input.name.length === 0 ||
    /^\s+$/.test(input.name)
  ) {
    errors.name = "Ingrese un nombre";
  }
  if (
    input.description === null ||
    input.description.length === 0 ||
    /^\s+$/.test(input.description)
  ) {
    errors.description = "Ingrese una descripcion para el juego";
  }
  if (input.rating < 0 || input.rating > 5) {
    errors.rating = "El rting debe ser entre 0 y 5";
  }
  return errors;
}

export default function CreateVideogame() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const allPlatforms = [
    "PC",
    "Xbox",
    "Play Station 3",
    "Play Station 4",
    "Play Station 5",
    "Android",
    "iOs",
    "macOs",
    "PS Vita",
  ];

  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: 0,
    released: "",
    genres: [],
    platforms: [],
    id: uuid(),
  });

  const [errors, setErrors] = useState({});
  let haveErrors = Object.values(errors);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //-----------------------------------------------------HANDLE INPUT VIDEOGAMES

  function handleInputVideogame(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  //--------------------------------------------------------HANDLE SELECT GENRES
  function handleCheckSelectGenres(e) {
    !input.genres.includes(e.target.value) && 
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
    e.target.value = ""
  }

  //---------------------------------------------------------HANDLE SELECT PLATFORMS
  function handleCheckPlatforms(e) {
    if(!input.platforms.includes(e.target.value)) {
      const newInput = {
        ...input,
        platforms: [...input.platforms, e.target.value],
      };
      setInput(newInput);
      setErrors(validate(newInput));
    }
    e.target.value = ""
  }

  //---------------------------------------------------------HANDLE BUTTON SUBMIT
  function handleSubmitCreate(e) {
    e.preventDefault();
    if(haveErrors.length === 0){
    dispatch(createGame(input));
    alert("Felicitaciones! Creaste un nuevo juego");
    setInput({
      name: "",
      description: "",
      rating: 0,
      released: "",
      genres: [],
      platforms: [],
    });
    }
  }

  function handleResetForm(e) {
    setInput({
      name: "",
      description: "",
      rating: 0,
      released: "",
      genres: [],
      platforms: [],
    });
  }

  function handleDeletePlatform(e,plat) {
    e.preventDefault()
    setInput({
      ...input,
      platforms: input.platforms.filter((pl) => pl !== plat),
    });
  }

  function handleDeleteGenre(e,genre) {
    e.preventDefault()
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== genre),
    });
  }


  return (
    <div>
      <Link to="/home">
        <button className="go-home">Volver a Home</button>
      </Link>
      <h1 className="title-new-game">CARGAR JUEGO NUEVO</h1>

      <form
        onSubmit={(e) => handleSubmitCreate(e)}
        className="container-todo-form"
      >
        <div className="form-control">
          <div className="div-input">
            <label>Nombre del juego*</label>
            <input
              className="input-form"
              type="text"
              required
              placeholder="Nombre del juego"
              value={input.name}
              name="name"
              autoComplete="off"
              onChange={handleInputVideogame}
            />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>

          <div className="div-input">
            <label>Descripción*</label>
            <textarea
              className="text-form"
              type="text"
              placeholder="Breve descripción"
              required
              rows="5"
              cols="30"
              minLength={15}
              value={input.description}
              name="description"
              autoComplete="off"
              onChange={handleInputVideogame}
            />
            {errors.description && (
              <p className="danger">{errors.description}</p>
            )}
          </div>
          <div className="input-creat-rat">
            <div className="div-inputs-grid">
              <label>Fecha de lanzamiento</label>
              <input
                className="inputs-size"
                type="date"
                value={input.released}
                name="released"
                onChange={handleInputVideogame}
              />
            </div>

            <div className="div-inputs-grid">
              <label>Rating</label>
              <input
                className="inputs-size"
                type="number"
                placeholder="1 to 5"
                min={1}
                max={5}
                step="1"
                value={input.rating}
                name="rating"
                autoComplete="off"
                onChange={handleInputVideogame}
              />
              {errors.rating && <p className="danger">{errors.rating}</p>}
            </div>
          </div>

          <div className="input-creat-rat">
            <div className="div-inputs-grid">
              <label>Generos</label>
              <select
                className="inputs-size"
                onChange={(e) => handleCheckSelectGenres(e)}
              >
                <option disabled selected hidden>
                  Seleccione genero/s
                </option>
                {genres.map((g) => {
                  return <option value={g.name}>{g.name}</option>;
                })}
              </select>
              {input.genres.map((genre) => (
                <div>
                  {" "}
                  <p className="pin-select">
                    {genre} 
                    <button onClick={(e) => handleDeleteGenre(e,genre)}>X</button>
                  </p>
                </div>
              ))}
            </div>

            <div className="div-inputs-grid">
              <label>Plataformas*</label>
              <div>
                <select
                  required
                  className="inputs-size"
                  onChange={(e) => handleCheckPlatforms(e)}
                >
                  <option selected value="">
                    Seleccione plataforma/s
                  </option>
                  {allPlatforms?.map((g) => (
                    <option value={g}>{g}</option>
                  ))}
                </select>
                {errors.platforms && (
                  <p className="danger">{errors.platforms}</p>
                )}
                {input.platforms.map((plat) => (
                  <div>
                    <p className="pin-select">
                      {plat}
                      <button onClick={(e) => handleDeletePlatform(e, plat)}>X</button>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="div-buttons">
            <button
              className="button-submit"
              type="submit"
              disabled={haveErrors.length}
            >
              CREAR
            </button>
            <button
              className="button-delete"
              onClick={(e) => handleResetForm(e)}
            >
              Limpiar formulario
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
