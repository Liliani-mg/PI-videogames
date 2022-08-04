import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  getGenres,
  filterGameByGenre,
  filterGamesByOrigin,
  orderByRating,
  orderByName,
} from "../actions";
import CardVideogame from "./CardVideogame";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  //traigo todo lo que esta en estos estados
  const allGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);

  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);

  const indexLastGame = currentPage * gamesPerPage;
  const indexFirstGame = indexLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexFirstGame, indexLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //cuando se monta el componente, traigo todo eso
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]); //con este segundo parametro evito que se llame siempre siempre
  //es el parametro del que depende que se monte o no, cuando

  // function handleClick (e){
  //     e.preventDefault()
  //     dispatch(getVideogames())
  // }
  // // en esta funcion lo que hace es recargar los games....

  //----------------------------------------------filtro por el Genero
  function handleClickGenre(e) {
    dispatch(filterGameByGenre(e.target.value));
  }

  //-----------------------------------------filtro por el origen de BD o API
  function handleClickFilterOrigin(e) {
    dispatch(filterGamesByOrigin(e.target.value));
  }

  //--------------------------------------------Ordeno por rating
  function handleOrderByRating(e) {
    //e.preventDefault()
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered by ${e.target.value}`);
  }

  // ----------------------------------------------Ordeno alfabeticamente por nombre
  function handleOrderByName(e) {
    //e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered by ${e.target.value}`);
  }

  return (
    <div className="containerHome">
      {/* ------------------------  aca deberia enviar a post, para que puda crear un nuevo juego ------------------------------------*/}
      <Link to="/createvideogame"><button className = "btnAgregarGame">Agregar un nuevo Videojuego</button></Link>
      <h1>Videogames</h1>
      <SearchBar />
      {/* <button onClick={e => {handleClick(e)}}>Recargar Juegos - Limpiar filtros</button> */}
      <div className="containerFilters">
        {/* ------------------------------------------------------------ ORDENAR POR RATING---------------------------*/}
        <select onChange={(e) => handleOrderByRating(e)}>
          <option>Ordenar por rating</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        {/* ---------------------------------------------------- ORDENAR POR ORDEN ALFABETICO ----------------------------*/}
        <select onChange={(e) => handleOrderByName(e)}>
          <option>Ordenar Alfabeticamente</option>
          <option value="a-z">a-Z</option>
          <option value="z-a">z-A</option>
        </select>
        {/* ------------------------------- FILTRO POR GENRES ------------------------------------------------------------*/}
        <select onChange={(e) => handleClickGenre(e)}>
          <option>Seleccione un género</option>
          <option value="All">Todos los generos incluidos</option>
          {/* -------------- mapeo todos los genros para que me los muestre en opciones ----------------------------------*/}
          {allGenres.map((e) => {
            return <option value={e.name}>{e.name}</option>;
          })}
        </select>
        {/* ---------------------------------------- FILTRO DB O API---------------------------------------------- */}
        <select onChange={(e) => handleClickFilterOrigin(e)}>
          <option>Juegos existentes o agregados</option>
          <option value="All">Todos</option>
          <option value="API">Existentes</option>
          <option value="DataBase">Agregados</option>
        </select>
      </div>

      <Paginado
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        paginado={paginado}
        currentPage={currentPage}
      />

      {/*---------------------  mostrar todos los videojuegos  con un map a una card d juegos ------------------------------*/}
      <div className="containerCards">
        {currentGames?.map((g) => {
          return (
            <CardVideogame
              id={g.id}
              key={g.id}
              image={g.image }
              name={g.name}
              genres={g.genres}
              rating={g.rating}
              description={g.description}
              platforms={g.platforms}
              fromDBorAPI={g.fromDBorAPI}
            />
          );
        })}
      </div>
      <Paginado
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        paginado={paginado}
      />
    </div>
  );
}
