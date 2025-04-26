import React from "react";
import ValueProps from "../components/Home/ValueProps";
import HomeHero from "../components/Home/HomeHero";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-charcoal pt-[86px] md:pt-[96px] px-4 md:px-8">
      <HomeHero />
      <ValueProps />
    </div>
  );
};

export default Home;
