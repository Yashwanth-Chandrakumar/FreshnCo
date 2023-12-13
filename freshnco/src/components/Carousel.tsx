
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
    
        let animationstring = 'animation';
        let animation = false;
        let keyframeprefix = '';
        const domPrefixes: string[] = 'Webkit Moz O Khtml'.split(' ');
        let pfx = '';
    
        if (slidy.style.animationName !== undefined) {
          animation = true;
        }
    
        if (animation === false) {
          for (let i = 0; i < domPrefixes.length; i++) {
            if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
              pfx = domPrefixes[i];
              animationstring = pfx + 'Animation';
              keyframeprefix = '-' + pfx.toLowerCase() + '-';
              animation = true;
              break;
            }
          }
        }
    
        if (animation === false) {
          // Handle animate in JavaScript fallback
        } else {
          const images = slidy.getElementsByTagName('img');
          const firstImg = images[0];
          const imgWrap = firstImg.cloneNode(false);
          slidy.appendChild(imgWrap);
    
          const imgCount = images.length;
          const totalTime = (timeOnSlide + timeBetweenSlides) * (imgCount - 1);
          const slideRatio = (timeOnSlide / totalTime) * 100;
          const moveRatio = (timeBetweenSlides / totalTime) * 100;
          const basePercentage = 100 / imgCount;
          let position = 0;
    
          const styleTag = document.createElement('style');
          styleTag.type = 'text/css';
          styleTag.innerHTML += `#slidy { text-align: left; margin: 0; font-size: 0; position: relative; width: ${imgCount * 100}%; }\n`;
          styleTag.innerHTML += `#slidy img { float: left; width: ${basePercentage}%; }\n`;
          styleTag.innerHTML += `@${keyframeprefix}keyframes slidy {\n`;
    
          for (let i = 0; i < imgCount - 1; i++) {
            position += slideRatio;
            styleTag.innerHTML += `${position}% { left: -${i * 100}% }\n`;
            position += moveRatio;
            styleTag.innerHTML += `${position}% { left: -${(i + 1) * 100}% }\n`;
          }
    
          styleTag.innerHTML += "}\n";
          styleTag.innerHTML += `#slidy { left: 0%; ${keyframeprefix}transform: translate3d(0,0,0); ${keyframeprefix}animation: ${totalTime}s slidy infinite; }\n`;
    
          document.body.appendChild(styleTag);
        }
      }, []);
    return (
      
    <div id="slidy-container">
  <figure id="slidy">
    <img src={img1} />
    <img src={img2}  />
    <img src={img3}  />
  </figure>
</div>
  )
}
