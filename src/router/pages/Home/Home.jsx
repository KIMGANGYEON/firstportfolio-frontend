import React, { useEffect, useState } from "react";
import SelfDevelopment from "./Sections/SelfDevelopment";
import Novel from "./Sections/Novel";
import Used from "./Sections/Used";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchData, setSearchData] = useState("");
  const [search, setSearch] = useState(true);
  const [moveRight, setMoveRight] = useState(600);
  const showSearch = () => {
    setMoveRight((prevMoveRight) => (prevMoveRight === 600 ? 420 : 600));
  };

  const searchUsed = () => {
    setSearch(true);
    setMoveRight(0);
  };

  const searchNew = () => {
    setMoveRight(0);
    setSearch(false);
  };

  const handleChange = (event) => {
    setSearchData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="home">
      <div className="search-box" style={{ right: `-${moveRight}px` }}>
        <h1 onClick={showSearch}>검색하기</h1>
        <div className="search-box-detail">
          <span onClick={searchUsed}>중고검색</span>
          <span onClick={searchNew}>새책검색</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="책 제목을 입력하세요"
            onChange={handleChange}
            value={searchData}
          />
          {search ? (
            // <Link to={`search/used/${123}`}>
            <button type="submit">중고검색</button>
          ) : (
            // </Link>
            // <Link to={`search/new/${456}`}>
            <button type="submit">새책검색</button>
            // </Link>
          )}
        </form>
      </div>
      <Used />
      <SelfDevelopment />
      <Novel />
    </section>
  );
};

export default Home;
