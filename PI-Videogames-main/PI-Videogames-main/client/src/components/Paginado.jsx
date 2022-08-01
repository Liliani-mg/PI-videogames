import React from "react";
import './Paginado.css'


export default function Paginado ({gamesPerPage, allGames, paginado}) {

    const pageNumbers = []
    
    for(let i=0; i <= Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i+1)
    }

  
     return(
        <nav >
            <ul className= "pagination">
                {
                    pageNumbers &&
                    pageNumbers.map( num => {
                        return (
                        <li key= {num}>
                            <a  onClick={()=>paginado(num)}>{num}</a>
                        </li>

                        )
                    })
                }
            </ul>
        </nav>
    )
}