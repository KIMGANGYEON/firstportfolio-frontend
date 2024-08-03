import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);

  const getIdBook = async () => {
    try {
      const response = await axios.get("/v1/search/book.json", {
        params: { query: id },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
        },
      });
      setBook(response.data.items[0]);
      console.log(book);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIdBook();
  }, []);

  return (
    <section className="productdetail-box">
      <div className="productdetail">
        <div className="img-box">
          <img src={book.image} alt="" />
        </div>
        <div className="text-box">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <h3>{book.description}</h3>
          <div></div>
        </div>
      </div>
      <div className="productdetail-btn">
        <h4>{book.discount}원</h4>
        <button>수량</button>
        <button>장바구니 담기</button>
        <button>구매하기</button>
      </div>
    </section>
  );
};

export default ProductDetail;
