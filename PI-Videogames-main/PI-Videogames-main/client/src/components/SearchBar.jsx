import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { searchVideogameByName, getVideogames} from "../actions/index";

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

   function handleInputChange (e){
        e.preventDefault()
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit  (e){
        e.preventDefault()
        dispatch(searchVideogameByName(name))
        setName("");
    }
    function handleSubmitAllGames  (e){
        e.preventDefault()
        dispatch(getVideogames())
        setName("");
    }

    return (
      <div>
        <input
          type="text"
          placeholder="Buscar juego..."
          onChange={e=>handleInputChange(e)}
          value={name}
        ></input>
        <button type="submit" onClick={(e)=>handleSubmit(e)}>
          Buscar
        </button>
        <button type="submit" onClick={(e)=>handleSubmitAllGames(e)}>
            Cargar todos los juegos
        </button>
      </div>
    );
}