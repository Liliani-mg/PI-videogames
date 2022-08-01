import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameDetail } from "../actions";
import "./CardVideogame.css";

export default function CardVideogame(props) {
  // quiero que me despache esta accion que me lleve al detalle del game
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogameDetail(props.id));
  }

  return (
    <div className="containerCard">
      <img
        src={props.image}
        alt="imagen de videojuego"
        width="300px"
        height="200px"
      />
      <h3 className="title">{props.name}</h3>
      {props.genres.map((g) => {
        return <h5 key={g.name}>{g.name}</h5>;
      })}
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
