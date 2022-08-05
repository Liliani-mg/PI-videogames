import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameDetail, getVideogames } from "../actions";
import "./CardVideogame.css";

export default function CardVideogame(props) {
 // quiero que me despache esta accion que me lleve al detalle del game
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames(props));
  }

  const DEFAULT_IMAGE =
    "../sony-playstation_00264701.png";

  return (
    <div key={props.id} className="containerCard">
      <div>
        <img
          src={props.image}
          alt="imagen de videojuego"
          width="300px"
          height="200px"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />
        
      </div>
      <h3 className="title">{props.name}</h3>
      <div className="CardGenres">
        <h4>Generos:</h4>
        {props.genres.map((g) => {
          return <h5>{g.name}</h5>;
        })}
      </div>
      <h6>Rating: {props.rating}</h6>
      <Link to={`/videogames/${props.id}`}>
        <button
          className="buttonCard"
          type="submit"
          onSubmit={(e) => handleClick(e)}
        >
          Ver detalle
        </button>
      </Link>
    </div>
  );
}
