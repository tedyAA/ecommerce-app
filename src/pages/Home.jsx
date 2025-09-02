import React from 'react';
import Hero from '../components/global/Hero.jsx';
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller.jsx";
import OurPolicy from "../components/global/OurPolicy.jsx";
import NewsletterBox from "../components/global/NewsletterBox.jsx";
import {assets} from "../assets/assets.js";

const Home = () => {
    return (
        <div>
            <Hero heroImg={assets.hero_img} page='Home'/>
            <LatestCollection/>
            <BestSeller/>
            <OurPolicy/>
            <NewsletterBox/>
        </div>
    )
}
export default Home;
