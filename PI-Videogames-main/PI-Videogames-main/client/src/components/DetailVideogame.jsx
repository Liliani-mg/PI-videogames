import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameDetail } from "../actions/index";
import "./DetailVideogame.css";

const DEFAULT_IMAGE = "https://media.istockphoto.com/photos/neon-sign-on-a-brick-wall-glowing-gamepad-icon-abstract-background-picture-id1306435820?b=1&k=20&m=1306435820&s=170667a&w=0&h=2w7KFk2tBOZ3lvKWRXC0DzHoW2l2MtMBGpGOhRz152E=";

export default function DetailVideogame(props) {
  console.log(props);

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.gameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div className="card-detail">
      <div>
        <div className="btn-to-home">
          <Link to="/home">
            <button>Volver a Home</button>
          </Link>
        </div>

        <h1 className="title-detail">DETALLES</h1>

        {detail && (
          <div className="containerCardD">
            <img
              src={detail.image || DEFAULT_IMAGE}
              alt="imagen de videojuego"
              width="500px"
              height="300px"
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE;
              }}
            />

            <h2 className="titleD">{detail.name}</h2>
            <div className="content-card">
              <h3>Generos:</h3>
              <h4>{detail.genres}</h4>
              <h3>Plataforma/s</h3>
              <h4>{detail.platforms}</h4>
              <h4>Fecha de lanzamiento: {detail.released}</h4>
              <h4>Rating: {detail.rating}</h4>
              <h3>Descripción:</h3>
              <p>{detail.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
