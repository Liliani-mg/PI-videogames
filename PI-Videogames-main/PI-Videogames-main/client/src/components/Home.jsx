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
import CardErrSearch from "./CardErrSearch";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  //traigo todo lo que esta en estos estados
  const allGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);

  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1); //comienza con la pag 1
  const [gamesPerPage, setGamesPerPage] = useState(15); //cada pagina contiene 15 games

  const indexLastGame = currentPage * gamesPerPage; //el idx del ultimo game = a la pagina act * 15
  const indexFirstGame = indexLastGame - gamesPerPage; //el idx del primero es el ultimo - 15
  const currentGames = allGames?.slice(indexFirstGame, indexLastGame); //el resultado de los games actuales desde el idx 1 al ultimo

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //cuando se monta el componente, despacha las actions
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]); //con este segundo parametro evito que se llame siempre siempre

  //----------------------------------------------filtro por el Genero
  function handleClickGenre(e) {
    dispatch(filterGameByGenre(e.target.value));
    setCurrentPage(1);
    e.target.value = "";
  }

  //-----------------------------------------filtro por el origen de BD o API
  function handleClickFilterOrigin(e) {
    dispatch(filterGamesByOrigin(e.target.value));
    setCurrentPage(1);
    e.target.value = "";
  }

  //--------------------------------------------Ordeno por rating
  function handleOrderByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
    e.target.value = "";
  }

  // ----------------------------------------------Ordeno alfabeticamente por nombre
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
    e.target.value = "";
  }

  return (
    <div className="containerHome">
      {/* ------------------------ --------- a post, para que pueda crear un nuevo juego ------------------------------------*/}
      <Link to="/createvideogame">
        <button className="btnAgregarGame">Agregar un nuevo Videojuego</button>
      </Link>
      <h1 className="title-home">HENRY GAMES</h1>

      <div className="container-sup">
        <div className="container-search">
          <SearchBar
          paginado={paginado}
          />
        </div>

        <div className="container-filters">
          {/* ------------------------------------------------------------ ORDENAR POR RATING---------------------------*/}
          <select
            className="select-filters"
            onChange={(e) => handleOrderByRating(e)}
          >
            <option className="select-filters" disabled selected value="">
              Ordenar por rating
            </option>
            <option className="select-filters" value="asc">
              Ascendente
            </option>
            <option className="select-filters" value="desc">
              Descendente
            </option>
          </select>
          {/* ---------------------------------------------------- ORDENAR POR ORDEN ALFABETICO ----------------------------*/}
          <select
            className="select-filters"
            onChange={(e) => handleOrderByName(e)}
          >
            <option disabled selected value="">
              Ordenar Alfabeticamente
            </option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
          {/* ------------------------------- FILTRO POR GENRES ------------------------------------------------------------*/}
          <select
            className="select-filters"
            onChange={(e) => handleClickGenre(e)}
          >
            <option disabled selected value="">
              Seleccione un género
            </option>
            <option value="All">Todos los generos incluidos</option>
            {/* -------------- mapeo todos los generos para que me los muestre en opciones ----------------------------------*/}
            {allGenres.map((e) => {
              return (
                <option key={e.name} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          {/* ---------------------------------------- FILTRO DB O API---------------------------------------------- */}
          <select
            className="select-filters"
            onChange={(e) => handleClickFilterOrigin(e)}
          >
            <option disabled selected value="">
              Juegos existentes o agregados
            </option>
            <option value="All">Todos</option>
            <option value="API">Existentes</option>
            <option value="DataBase">Agregados</option>
          </select>
        </div>
      </div>

      <Paginado
        gamesPerPage={gamesPerPage}
        allGames={allGames?.length || 0}
        paginado={paginado}
        currentPage={currentPage}
      />

      {/*---------------------  mostrar todos los videojuegos  con un map a una card d juegos ------------------------------*/}

      {!allGames ? (
        <img
          height="150px"
          weight="150px"
          src="https://acegif.com/wp-content/uploads/loading-11.gif"
          alt="cargando"
        />
      ) : allGames.length === 0 ? (
        <CardErrSearch />
      ) : (
        <div className="containerCards">
          {currentGames?.map((g) => {
            return (
              <CardVideogame
                id={g.id}
                key={g.id}
                image={g.image}
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
      )}

    
      <Paginado
        gamesPerPage={gamesPerPage}
        allGames={allGames?.length || 0}
        paginado={paginado}
      />
    </div>
  );
}
