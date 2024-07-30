import React, { useEffect, useState } from "react";
import axios from "axios";
import SelfDevelopment from "./Sections/SelfDevelopment";
import Novel from "./Sections/Novel";
import Used from "./Sections/Used";

const Home = () => {
  return (
    <section>
      <SelfDevelopment />
      <Novel />
      <Used />
    </section>
  );
};

export default Home;
