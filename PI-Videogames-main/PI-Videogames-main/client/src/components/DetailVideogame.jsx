import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getVideogameDetail } from "../actions/index";

export default function DetailVideogame(props) {
  console.log(props);

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.gameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div>
      <div>
        <Link to="/home">
          <button>Volver a Home</button>
        </Link>
        {detail && <div>
          <h1>DETALLES</h1>
          <img src={detail.image} alt="image videogame" />
          <h2>{detail.name}</h2>
          <h3>Generos:</h3>
          { detail.genres?.map((g) => {
            return <h4 key={g.name}>{g.name}</h4>;
          })}
          <h3>Plataforma/s</h3>
          {detail.platforms?.map((p) => {
       
            return <h4 key={p}>{p}</h4>;
          })}
          <h4>Fecha de lanzamiento: {detail.released}</h4>
          <h4>Rating: {detail.rating}</h4>
          <h3>Descripción:</h3>
          <p>{detail.description}</p>
            
        </div>}
      </div>
    </div>
  );
}
