import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const FILTER_GAMES_BY_ORIGIN = "FILTER_GAMES_BY_ORIGIN";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const SEARCH_VIDEOGAME_BY_NAME = "SEARCH_VIDEOGAME_BY_NAME";
export const FILTER_GAME_BY_GENRE = "FILTER_GAME_BY_GENRE";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const CREATE_GAME = "CREATE_GAME";


export function getVideogames() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/videogames");
    console.log("ACA EN GET", json.data)
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRES,
      payload: json.data,
    });
  };
}

export function filterGameByGenre(payload) {
  return {
    type: FILTER_GAME_BY_GENRE,
    payload,
  };
}

export function filterGamesByOrigin(payload) {
    return {
      type: FILTER_GAMES_BY_ORIGIN,
      payload,
    };
  }

export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function getVideogameDetail(id) {
  return async function (dispatch) {
    try{
      const json = await axios.get(`http://localhost:3001/videogames/${id}`);
      console.log("HOLAAAAAAAAAAAAAAAA", json.data)
      return dispatch({
        type: GET_VIDEOGAME_DETAIL,
        payload: json.data,
      });
    }catch(error){
      console.log(error)
    }
  };
}



export function searchVideogameByName(name) {
  return async function (dispatch) {
    try{
      const json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      console.log(json.data)
    
      return dispatch({
        type: SEARCH_VIDEOGAME_BY_NAME,
        payload:  json.data,
      });
      
    }catch(error){
      return (error)
    }
  }
}

export function createGame (payload){
  return async function (dispatch){
      const json = await axios.post(`http://localhost:3001/videogames`,payload)
      console.log("HOLAAAAAAAAAAAAAAAA", payload)
      return json
    }
}