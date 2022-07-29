import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_GAMES_BY_ORIGIN,
  GET_VIDEOGAME_DETAIL,
  GET_VIDEOGAME_BY_NAME,
} from "../actions/index";

const initialState = {
  videogames: [],
  gameDetail: {},
  genres: [],
  filtersApply: [],

};

function rootReducer(state = initialState, action) {
  //switch - case
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_GAMES_BY_ORIGIN:
      const filtersApply = state.filters;
      const filterOrigin =
        action.payload == "API"
          ? filtersApply.filter((e) => e.fromDBorAPI == "API")
          : filtersApply.filter((e) => e.fromDBorAPI == "DataBase");
      return {
        ...state,
        filterOrigin,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        game: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
