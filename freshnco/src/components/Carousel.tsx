import { useEffect } from "react";
import img1 from "../assets/images/20231213_112930_0000.png";
import img2 from "../assets/images/20231213_113305_0000.png";
import img3 from "../assets/images/20231213_113305_0001.png";

export default function Carousel() {
  useEffect(() => {
    const slidy = document.getElementById('slidy');
  
    if (!slidy) {
      return;
    }
  
    const timeOnSlide = 3;
    const timeBetweenSlides = 1;
  
    let animation = false;
    let keyframeprefix = '';
    const domPrefixes: Array<string> = ["Webkit", "Moz", "O", "Khtml"];
    let pfx = '';
  
    if (slidy.style.animationName !== undefined) {
      animation = true;
    }
  
    if (animation === false) {
      for (let i: number = 0; i < domPrefixes.length; i++) {
        const animationName = slidy.style.getPropertyValue(domPrefixes[i] + "AnimationName");
        if (animationName !== undefined && animationName !== "") {
          pfx = domPrefixes[i];
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }
  
    if (animation) {
      const imgCount = slidy.getElementsByTagName('img').length;
      const totalTime = (timeOnSlide + timeBetweenSlides) * (imgCount - 1);
      const slideRatio = (timeOnSlide / totalTime) * 100;
      const moveRatio = (timeBetweenSlides / totalTime) * 100;
  
      const styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      styleTag.innerHTML += `#slidy { text-align: left; margin: 0; font-size: 0; position: relative; width: ${imgCount * 100}%; }\n`;
      styleTag.innerHTML += `#slidy img { float: left; width: ${(100 / imgCount)}%; }\n`;
      styleTag.innerHTML += `@${keyframeprefix}keyframes slidy {\n`;
  
      for (let i: number = 0; i < imgCount - 1; i++) {
        let position = i * (slideRatio + moveRatio);
        styleTag.innerHTML += `${position}% { left: -${i * 100}% }\n`;
      }
  
      styleTag.innerHTML += "}\n";
      styleTag.innerHTML += `#slidy { left: 0%; ${keyframeprefix}transform: translate3d(0,0,0); ${keyframeprefix}animation: slidy ${totalTime}s infinite; }\n`;
  
      document.head.appendChild(styleTag);
    }
  }, []);
  

  return (
    <div id="slidy-container">
      <figure id="slidy">
        <img src={img1} alt="slide" />
        <img src={img2} alt="slide" />
        <img src={img3} alt="slide" />
      </figure>
    </div>
  );
}
