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
    "https://media.istockphoto.com/photos/neon-sign-on-a-brick-wall-glowing-gamepad-icon-abstract-background-picture-id1306435820?b=1&k=20&m=1306435820&s=170667a&w=0&h=2w7KFk2tBOZ3lvKWRXC0DzHoW2l2MtMBGpGOhRz152E=";

  return (
    
    <div key={props.id} className="containerCard">
      <div>
        <img
          src={props.image || DEFAULT_IMAGE}
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
