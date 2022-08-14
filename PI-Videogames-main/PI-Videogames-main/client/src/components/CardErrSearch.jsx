import React from "react";
import { useDispatch } from "react-redux";
import { getVideogames } from "../actions";
import "./CardVideogame.css";

export default function CardErr() {
  const dispatch = useDispatch();

  function handleSubmitAllGames(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <div className="containerCard">
      <div>
        <img
          src="https://cdn2.iconfinder.com/data/icons/search-color/32/Cancel-512.png"
          alt="imagen de videojuego"
          width="200px"
          height="200px"
        />
      </div>
      <h1 className="error-title">ERROR</h1>
      <h3 className="title">No se encontro el juego que buscas!</h3>
      <button
        className="button-error-volver-home"
        type="submit"
        onClick={handleSubmitAllGames}
      >
        Cargar todos los juegos
      </button>
    </div>
  );
}
