import React from 'react';
import Hero from "../components/global/Hero.jsx";
import {assets} from "../assets/assets.js";

const About = () => {
    return(
        <div>
          <Hero heroImg={assets.hero2_img} page='About'/>
        </div>
    )
}
export default About;
