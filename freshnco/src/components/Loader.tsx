
import loadgif from "../assets/images/image_processing20201030-8328-84rtz2.gif";
const Loader = () => {
  return (
    <div className="loader">
      <img src={loadgif} alt="Loader" className="loader-gif"/>
    </div>
  );
};

export default Loader;
