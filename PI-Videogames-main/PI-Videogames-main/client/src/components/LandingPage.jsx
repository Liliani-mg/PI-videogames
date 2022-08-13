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
          <div className="container-button">
            <button className="buttonLanding">
              <div className="rocket">
                <img
                  height="100"
                  src="https://images.vexels.com/media/users/3/145819/isolated/preview/486c34cf5b3b4badd52bc427dbeb44a1-dibujos-animados-de-cohetes.png"
                  alt=""
                />
                <p className="p-btn">GO!</p>
              </div>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
