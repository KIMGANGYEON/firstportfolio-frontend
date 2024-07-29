import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const SelfDevelopment = () => {
  const scrollBox = useRef(null);
  const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;
  const [selfDevelopment, setSelfDevelopment] = useState([]);
  const getNaverBook = async () => {
    try {
      const response = await axios.get("/v1/search/book.json", {
        params: { query: "자기계발", display: 20, start: 1, srot: "sim" },
        headers: {
          "X-Naver-Client-Id": CLIENT_ID,
          "X-Naver-Client-Secret": CLIENT_SECRET,
        },
      });
      setSelfDevelopment(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="selfdevelopment">
      <div className="selfdevelopment-title">
        <h1>자기개발</h1>
      </div>
      <div className="scroll-box">
        <div className="selfdevelopment-box" ref={scrollBox}>
          {selfDevelopment.map((book) => (
            <div className="book-box" key={book.isbn}>
              <img src={book.image} />
              <h1>{book.title}</h1>
              <div className="author-box">
                <h2>{book.author}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelfDevelopment;
