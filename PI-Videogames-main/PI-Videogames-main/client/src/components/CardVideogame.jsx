import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameDetail } from "../actions";
import './CardVideogame.css'

export default function CardVideogame(props) {


    // quiero que me despache esta accion que me lleve al detalle del game
    const dispatch = useDispatch()
    function handleClick (e){
        e.preventDefault()
        dispatch(getVideogameDetail(props.id))
    }

  return (
    <div className="containerCard">
      <Link to={`/videogame/${props.id}`} onClick={(e) => handleClick(e)}>
        <img
          src={props.image}
          alt="imagen de videojuego"
          width="300px"
          height="200px"
        />
        <h3 className="title">{props.name}</h3>
        <h5>{props.genres}</h5>
        <button className="buttonCard" onClick={(e) => handleClick(e)}>
          Ver detalle
        </button>
      </Link>
    </div>
  );
}
