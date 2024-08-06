import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchState } from "../../../../atom";
import { useQuery } from "@tanstack/react-query";
import { newSearchBook } from "../../../../api";
import axios from "axios";
import { Link } from "react-router-dom";

const NewSearch = () => {
  const search = localStorage.getItem("searchWord");
  const [count, setCount] = useState(20);
  const [prevData, setPrevData] = useState([]);

  const getBook = async () => {
    try {
      const response = await axios.get("/v1/search/book.json", {
        params: { query: search, display: count, start: 1, srot: "sim" },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
        },
      });
      setPrevData(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBook();
  }, [count]);

  const handleClick = () => {
    setCount((prev) => prev + 20);
  };
  return (
    <section className="search-new">
      {prevData.length === 0 ? (
        <h1 style={{ fontSize: 30, marginTop: 10, marginLeft: 30 }}>
          검색된 결과가 없습니다
        </h1>
      ) : (
        <div className="new-book">
          <div className="new-header">
            <h1>검색결과</h1>
          </div>
          {prevData?.map((book, index) => (
            <div key={book.isbn} className="new-book-box">
              <div className="new-book-img">
                <Link to={`/product/detail/${book.isbn}`}>
                  <img src={book.image} alt="" />
                </Link>
              </div>
              <div className="new-book-text">
                <h1>{book.title}</h1>
                {book.description.length > 1199 ? (
                  <h1>{book.description.slice(0, 1200)}....</h1>
                ) : (
                  <h1>{book.description}</h1>
                )}

                <h1>{book.discount}원</h1>
              </div>
            </div>
          ))}
          <div className="new-book-btn">
            <button onClick={handleClick}>더보기</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewSearch;
