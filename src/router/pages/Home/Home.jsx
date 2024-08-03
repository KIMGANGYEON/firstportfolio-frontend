import React from "react";
import SelfDevelopment from "./Sections/SelfDevelopment";
import Novel from "./Sections/Novel";
import Used from "./Sections/Used";

const Home = () => {
  return (
    <section>
      <Used />
      <SelfDevelopment />
      <Novel />
    </section>
  );
};

export default Home;
