import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../utils/axios";
import { Link } from "react-router-dom";

const Used = () => {
  const [product, setProduct] = useState([]);
  const scrollRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/get");
      setProduct(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
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
    <div className="selfdevelopment" style={{ marginTop: 100 }}>
      <div className="selfdevelopment-title">
        <h1>중고서적</h1>
      </div>
      <div className="scroll-box" ref={scrollRef}>
        <div className="selfdevelopment-box">
          {product.map((book) => (
            <Link to={`/product/used/detail/${book._id}`} key={book._id}>
              <div className="book-box">
                <img src={`http://localhost:4000/${book.images[0]}`} />
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

export default Used;
