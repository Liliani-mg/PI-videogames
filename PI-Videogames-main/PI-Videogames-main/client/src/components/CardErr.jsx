import React from "react";
import { Link } from "react-router-dom";
import "./CardVideogame.css";

export default function CardErr() {
  return (
    <div className="containerCard">
      <div>
        <img
          src="https://assets.hostinger.com/lang/es-mx/images/404-3a53e76ef1.png"
          alt="imagen de videojuego"
          width="300px"
          height="200px"
        />
      </div>
      <h1 className="error-title">ERROR - 404</h1>
      <h3 className="title">No se encontro resultado</h3>
      <Link to="/home">
        <button className="button-error-volver-home">VOLVER A HOME</button>
      </Link>
    </div>
  );
}
