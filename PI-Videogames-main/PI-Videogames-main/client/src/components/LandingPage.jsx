import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="containerLanding">
      <div>
        <h1 className="titleLanding"> Videogames </h1>
      </div>
      
      <div>
        <Link to="/home">
          <button className="buttonLanding">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
