import {
  FILTER_GAME_BY_GENRE,
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_GAMES_BY_ORIGIN,
  GET_VIDEOGAME_DETAIL,
  SEARCH_VIDEOGAME_BY_NAME,
  ORDER_BY_RATING,
  ORDER_BY_NAME,
  CREATE_GAME
} from "../actions/index";

const initialState = {
  allGamesIncluded: [],
  videogames: undefined,
  gameDetail: {},
  genres: [],
  //filtersApply: [],
};

function rootReducer(state = initialState, action) {
  //switch - case
  switch (action.type) {
    //--------------------------------------------------TRAE TODOS LOS GAMES
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allGamesIncluded: action.payload,
      };

    // --------------------------------------------------TODOS LOS GENEROS
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    //---------------------------------------------------FILTRO POR GENEROS
    case FILTER_GAME_BY_GENRE:
      const allVideogames = state.allGamesIncluded;
      const gamesByGenre =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((p) => p.genres.includes(action.payload));
      if (!gamesByGenre.length) {
        return {
          ...state,
          videogames: allVideogames,
        };
      } else {
        return {
          ...state,
          videogames: gamesByGenre,
          filtersApply: action.payload,
        };
      }

    //------------------------------------------------------GET_VIDEOGAME_DETAIL:
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };

    //------------------------------------------------------FILTRO SEGUN EL ORIGEN BD O API NO ANDAAAA
    case FILTER_GAMES_BY_ORIGIN:
      const allgames = state.allGamesIncluded;
      console.log(action.payload)
      const filterOrigin =
      action.payload === "DataBase"
        ? allgames.filter((g) => g.fromDBorAPI === "DataBase")
        : allgames.filter((g) => g.fromDBorAPI === "API");
        console.log(filterOrigin)
      return {
        ...state,
        videogames: action.payload === "All" ? allgames : filterOrigin
      };

    //----------------------------------------------------------------ORDENAR POR RATING
    case ORDER_BY_RATING:
      console.log(action.payload)
       let orderByRating =
        action.payload === "desc"
          ? state.allGamesIncluded.sort((a, b) => b.rating - a.rating)
          : state.allGamesIncluded.sort((a, b) => a.rating - b.rating);
          console.log(orderByRating)
      return {
        ...state,
        videogames: orderByRating,
        //filtersApply: action.payload,
      };

    //-------------------------------------------------ORDENAR ALFABETICAMENTE - NOMBRE
    case ORDER_BY_NAME:
      const orderByName =
        action.payload === "a-z"
          ? state.allGamesIncluded.sort((a, b) => {
             return a.name.localeCompare(b.name)
            })
          : state.allGamesIncluded.sort(function (a, b) {
            return b.name.localeCompare(a.name)
            });
            
      return {
        ...state,
        videogames: orderByName,
      };
   
    //-----------------------------------------------Search
    case SEARCH_VIDEOGAME_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    //---------------------------------------------------POST
    case CREATE_GAME:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default rootReducer;
