import React from "react";
import { Link } from "react-router-dom";
import "./CardVideogame.css";


export default function CardError() {
 // quiero que me despache esta accion que me lleve al detalle del game

  

  return (
    <div  className="containerCard">
      <div>
        <img
          src="https://assets.hostinger.com/lang/es-mx/images/404-3a53e76ef1.png"
          alt="imagen de videojuego"
          width="300px"
          height="200px"
         />
        
      </div>
      <h3 className="title">No se encontro resultado</h3>
      <Link to='/home'><button>VOLVER A HOME</button></Link>
    </div>
  );
}
