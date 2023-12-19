import { useState, useEffect } from "react";
import loadgif from "../assets/images/image_processing20201030-8328-84rtz2.gif";
const Loader = () => {
  return (
    <div className="loader">
      <img src={loadgif} alt="Loader" style={{ height: "60vh", width: "40%" }}/>
    </div>
  );
};

export default Loader;
