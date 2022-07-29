import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, getGenres, getVideogameDetail } from "../actions";
import CardVideogame from "./CardVideogame";
import './Home.css'


export default function Home () {
    const dispatch = useDispatch()

    //traigo todo lo que esta en estos estados
    const allGames =  useSelector( (state) => state.videogames)
    const allGenres =  useSelector( (state) => state.genres)

    //cuando se monta el componente, traigo todo eso
    useEffect( ()=> {
        dispatch(getVideogames())
        dispatch(getGenres())
        dispatch(getVideogameDetail())
    }, [dispatch]) //con este segundo parametro evito que se llame siempre siempre
//es el parametro del que depende que se monte o no, cuando

    // function handleClick (e){
    //     e.preventDefault()
    //     dispatch(getVideogames())
    // } en esta funcion lo que hace es recargar los games....

    return (
      <div className='containerHome'>
        {/* aca deberia enviar a post, para que puda crear un nuevo juego */}
        <Link to="/videogame">Agregar un nuevo Videojuego</Link>
        <h1>Videogames</h1>
        {/* <button onClick={e => {handleClick(e)}}>Recargar Juegos</button> */}
        <div className="containerFilters">
          {/* ME FALTARIA ORDENA POR RATIN Y ALFAB */}
          <select>
            <option>Ordenar por rating</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <select>
            <option>Ordenar Alfabeticamente</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
          <select>
            <option>Seleccione un género</option>
            {/* mapeo todos los genros para que me los muestre en opciones */}
            {allGenres.map((e) => {
              return <option value={e.name}>{e.name}</option>;
            })}
          </select>
          <select>
            <option>Juegos existentes o agregados</option>
            <option value="todos">Todos</option>
            <option value="existentes">Existentes</option>
            <option value="agregados">Agregados</option>
          </select>
        </div>
        <div className="containerCards">
          {/* mostrar todos los videojuegos  con un map a una card d juegos*/}
          {allGames &&
            allGames.map((g) => {
              return (
                <Link to={`/videogame/${g.id}`}>
                   <CardVideogame
                    id={g.id}
                    key={g.id}
                    image={g.image}
                    name={g.name}
                    genres={g.genres}
                    description={g.description}
                    platforms={g.platforms}
                  />
                </Link>
              
              );
            })}
        </div>
      </div>
    );
}