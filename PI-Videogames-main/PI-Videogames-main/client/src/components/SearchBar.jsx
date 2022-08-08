import React from "react";
import {useState} from "react";
import { useDispatch} from "react-redux";
//import { useSelector } from "react-redux";
import { searchVideogameByName, getVideogames} from "../actions/index";
import './SearchBar.css'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    //const listgames = useSelector((state) => state.allGamesIncluded);


   function handleInputChange (e){
        e.preventDefault()
        setName(e.target.value);
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
     // console.log(listgames)

    return (
      
      <div>
        <input
        className="input-search"
          type="text"
          placeholder="Buscar juego..."
          onChange={e=>handleInputChange(e)}
          value={name}
          // list="suggestions"
        ></input>
        {/* <datalist id="suggestions">
          {
            listgames?.map((g, i) => (<option key={i} value={g.name}/>))
          }
        </datalist> */}
        <button type="submit" onClick={(e)=>handleSubmit(e)}>
          Buscar
        </button>
        <button type="submit" onClick={(e)=>handleSubmitAllGames(e)}>
            Cargar todos los juegos
        </button>
      </div>
    );
}