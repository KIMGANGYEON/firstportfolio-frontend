import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SelfDevelopment = () => {
  const scrollRef = useRef(null);
  const [selfDevelopment, setSelfDevelopment] = useState([]);
  const getNaverBook = async () => {
    try {
      const response = await axios.get("/v1/search/book.json", {
        params: { query: "자기계발", display: 20, start: 1, srot: "sim" },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
        },
      });
      setSelfDevelopment(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNaverBook();

    const handleWheel = (event) => {
      event.preventDefault();
      if (scrollRef.current) {
        const scrollAmount = event.deltaY;
        scrollRef.current.scrollLeft += scrollAmount;
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="selfdevelopment">
      <div className="selfdevelopment-title">
        <h1>자기개발</h1>
      </div>
      <div className="scroll-box" ref={scrollRef}>
        <div className="selfdevelopment-box">
          {selfDevelopment.map((book) => (
            <Link to={`/product/detail/${book.isbn}`} key={book.isbn}>
              <div className="book-box">
                <img src={book.image} />
                <h1>{book.title}</h1>
                <div className="author-box">
                  <h2>{book.author}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelfDevelopment;
