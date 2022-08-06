import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../actions";
import "./CardVideogame.css";

export default function CardVideogame(props) {
 // quiero que me despache esta accion que me lleve al detalle del game
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames(props));
  }

  const DEFAULT_IMAGE =
    "../images/video-games-wallpapers-wallpaper-cave.png";

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
        <h4>Generos:</h4>
      <div className="CardGenres">
        {/* {
          props.genres?.includes(typeof props.genres === "object") 
          ? props.genres.map(g=> <h5>{' - '+ g.name}</h5>)
          : <h5>{props.genres}</h5>
        } */}
        {props.genres && props.genres.map((g) => {
          return <h5>{' - '+ g}</h5>;
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
