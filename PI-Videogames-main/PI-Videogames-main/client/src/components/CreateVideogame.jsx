import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenres, createGame } from "../actions";
import { v4 as uuid } from "uuid";
import "./CreateVideogame.css";

function validate(input) {
  let errors = {};
  if (
    input.name == null ||
    input.name.length == 0 ||
    /^\s+$/.test(input.name)
  ) {
    errors.name = "Ingrese un nombre";
  }
  if (
    input.description == null ||
    input.description.length == 0 ||
    /^\s+$/.test(input.description)
  ) {
    errors.description = "Ingrese una descripcion para el juego";
  }
  if (input.rating < 0 || input.rating > 5) {
    errors.rating = "El rting debe ser entre 0 y 5";
  }

  if (input.platforms < 1) {
    errors.platforms = "Ingrese al menos una plataforma";
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

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //--------------------------------------------------HANDLE INPUT VIDEOGAMES

  function handleInputVideogame(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  //---------------------------------------------------HANDLE SELECT GENRES
  function handleCheckSelectGenres(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  //-------------------------------------------------------------------
  function handleCheckPlatforms(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
    console.log(input);
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  //----------------------------------------------HANDLE BUTTON SUBMIT
  function handleSubmitCreate(e) {
    e.preventDefault();
    console.log(input);
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

console.log(input)

  return (
    <div>
      <Link to="/home">
        <button className="go-home">Volver a Home</button>
      </Link>
      <h1 className="title-new-game">CREAR UN JUEGO</h1>

      <form
        onSubmit={(e) => handleSubmitCreate(e)}
        className="container-todo-form"
      >
        <div className="form-control">
          <div className="div-input">
            <label>Nombre del juego</label>
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
            <label>Descripción</label>
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
              <label>Fecha de creación</label>
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
                <option>Seleccione genero/s</option>
                {genres.map((g) => {
                  return <option value={g.name}>{g.name}</option>;
                })}
              </select>
              <ul>
                <li>{input.genres.map((e) => " - " + e)}</li>
              </ul>
            </div>

            <div className="div-inputs-grid">
              <label>Plataformas</label>
              <div>
                <select
                  className="inputs-size"
                  onChange={(e) => handleCheckPlatforms(e)}
                >
                  <option>Seleccione plataforma/s</option>
                  {allPlatforms.map((g) => (
                    <option value={g}>{g}</option>
                  ))}
                </select>
                <ul>
                  <li>{input.platforms.map((e) => " - " + e)}</li>
                </ul>
                {errors.platforms && (
                  <p className="danger">{errors.platforms}</p>
                )}
              </div>
            </div>
          </div>

          <div className="div-buttons">

            <button className="button-submit" type="submit">
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
