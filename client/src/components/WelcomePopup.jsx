import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const WelcomePopup = () => {
  return (
    <div className="container">
      <div className="welcomePopup">
        <h1>OiSnap!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi,
          accusantium libero id neque modi in at tempora quas, deserunt iure
          enim aspernatur? Asperiores nulla aperiam ad. Explicabo quos placeat
          neque.
        </p>
        <button>
          <Link to="/home">START</Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePopup;