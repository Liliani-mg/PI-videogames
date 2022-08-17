import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
      <h1 className="error-title">NO SE ENCONTRO LO QUE BUSCAS</h1>
      {/* <h3 className="title">No se encontro lo que buscas!</h3> */}
      <Link to="/createvideogame"><button
      className="button-error-volver-home"
      type="submit">Agregar nuevo juego</button></Link> 
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
