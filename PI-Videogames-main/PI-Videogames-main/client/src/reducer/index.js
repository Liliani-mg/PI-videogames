import {
  FILTER_GAME_BY_GENRE,
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_GAMES_BY_ORIGIN,
  GET_VIDEOGAME_DETAIL,
  SEARCH_VIDEOGAME_BY_NAME,
  ORDER_BY_RATING,
  ORDER_BY_NAME,
} from "../actions/index";

const initialState = {
  allGamesIncluded: [],
  videogames: [],
  gameDetail: {},
  genres: [],
  filtersApply: [],
};

function rootReducer(state = initialState, action) {
  //switch - case
  switch (action.type) {
    //-----------------------------------TRAE TODOS LOS GAMES
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allGamesIncluded: action.payload,
      };

    // ----------------------------------------------------TODOS LOS GENEROS
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    //-------------------------------------------------------FILTRO POR GENEROS
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

    //-------------------------------------------
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };

    //------------------------------------------------------FILTRO SEGUN EL ORIGEN BD O API NO ANDAAAA
    case FILTER_GAMES_BY_ORIGIN:
      const allgames = state.allGamesIncluded;
      const filterOrigin =
        action.payload === "All"
          ? allgames
          : state.allGamesIncluded.filter((g) => {
              if (action.payload === "API") {
                return state.allGamesIncluded.includes(
                  typeof g.id === "Number"
                );
              } else {
                return state.allGamesIncluded.includes(
                  typeof g.id === "String"
                );
              }
            });
      // action.payload === "DataBase"
      //   ? allgames.filter((g) => g.fromDBorAPI === "DataBase")
      //   : allgames.filter((g) => g.fromDBorAPI === "API")
      return {
        ...state,
        videogames: filterOrigin,
      };

    //----------------------------------------------------------------ORDENAR POR RATING
    case ORDER_BY_RATING:
      const games = state.allGamesIncluded;
      let orderByRating =
        action.payload === "asc"
          ? state.allGamesIncluded.sort((a, b) => b.rating - a.rating)
          : state.allGamesIncluded.sort((a, b) => a.rating - b.rating);
      return {
        ...state,
        videogames: orderByRating,
        //filtersApply: action.payload,
      };

    //-------------------------------------------------ORDENAR ALFABETICAMENTE - NOMBRE
    case ORDER_BY_NAME:
      const orderByName =
        action.payload === "a-z"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: orderByName,
      };
   
    //-----------------------------------------------
    case SEARCH_VIDEOGAME_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
