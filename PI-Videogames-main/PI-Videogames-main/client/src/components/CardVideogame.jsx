import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameDetail, getVideogames } from "../actions";
import "./CardVideogame.css";

export default function CardVideogame(props) {
  console.log(props);
  // quiero que me despache esta accion que me lleve al detalle del game
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames(props));
  }

  return (
    <div key={props.id} className="containerCard">
      {/* {
        props.image 
        ? <img
          src={props.image}
          alt="imagen de videojuego"
          width="300px"
          height="200px"
        />
        : <img
        src="../letrero-neon-videojuegos_36298-743 (1).png"
        alt="imagen de videojuego"
        width="300px"
        height="200px"
      />
      } */}
      <img
          src={props.image}
          alt="imagen de videojuego"
          width="300px"
          height="200px"
        />
      <h3 className="title">{props.name}</h3>
      {props.genres.map((g) => {
        return (<h5 key={g.name}>{g}</h5>);
      })}
      <h6>{props.rating}</h6>
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
