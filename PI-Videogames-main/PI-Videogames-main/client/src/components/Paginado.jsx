import React from "react";
import "./Paginado.css";

export default function Paginado({
  gamesPerPage,
  allGames,
  paginado,
  currentPage,
}) {
  return (
    <div>
      {currentPage > 1 ? (
        <button className="pagination" onClick={() => paginado(currentPage - 1)}>{"<<"}</button>
      ) : null}
      {Array.from(
        { length: Math.ceil(allGames / gamesPerPage) },
        (e, i) => i + 1
      ).map((i) => (
        <button className="pagination" key={i} onClick={() => paginado(i)}>
          {i}
        </button>
      ))}

      {currentPage < allGames / gamesPerPage ? (
        <button className="pagination" onClick={() => paginado(currentPage + 1)}>{">>"}</button>
      ) : null}
    </div>
  );
}
