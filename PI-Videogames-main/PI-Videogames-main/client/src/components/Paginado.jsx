import React from "react";
import './Paginado.css'


export default function Paginado ({gamesPerPage, allGames, paginado}) {

    return(
        <div>
            { Array.from(
                { length: Math.ceil(allGames / gamesPerPage) },
                (e, i) => i+1
              ).map((i) => (
                <button className="pagination" key={i} onClick={() => paginado(i)}>
                  {i}
                </button>
              ))}
        </div>
      

    )

}