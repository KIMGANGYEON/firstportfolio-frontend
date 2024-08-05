import React, { useEffect, useState } from "react";
import SelfDevelopment from "./Sections/SelfDevelopment";
import Novel from "./Sections/Novel";
import Used from "./Sections/Used";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "../../../atom";

const Home = () => {
  const [search, setSearch] = useState(true);
  const navigate = useNavigate();
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
    localStorage.setItem("searchWord", event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search == true) {
      navigate("/search/used");
    } else {
      navigate("/search/new");
    }
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
          />
          {search ? (
            <button type="submit">중고검색</button>
          ) : (
            <button type="submit">새책검색</button>
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
