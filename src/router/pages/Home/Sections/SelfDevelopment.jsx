import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNaverBook } from "../../../../api";

const SelfDevelopment = () => {
  const scrollRef = useRef(null);
  const { isLoading, data } = useQuery({
    queryKey: ["selfDevelopment"],
    queryFn: getNaverBook,
  });
  useEffect(() => {
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
          {data?.data.items.map((book) => (
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
